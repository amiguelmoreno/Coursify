import getChapter from "@/actions/getChapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/videoPlayer";
import CourseEnrollButton from "./_components/courseEnrollButton";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/courseProgressButton";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant={"success"}
          label='You already completed this chapter.'
        ></Banner>
      )}
      {isLocked && (
        <Banner
          variant={"warning"}
          label='You need to purchase this course to watch this chapter.'
        ></Banner>
      )}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className='relative p-4'>
          <p className='absolute z-50 bg-orange-400 p-2 rounded-sm m-4 bottom-4'>
            Videos are currently unavailable due to the limitations of free
            service plans.
          </p>
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id!}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          ></VideoPlayer>
        </div>
        <div>
          <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
            <h2 className='text-2xl font-semibold mb-2'>{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              ></CourseEnrollButton>
            )}
          </div>
          <Separator></Separator>
          <div>
            <Preview value={chapter.description!}></Preview>
          </div>
          {!!attachments.length && (
            <>
              <Separator></Separator>
              <div className='p-4'>
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    key={attachment.id}
                    target='_blank'
                    className='flex items-center p-3 w-full bg-purple-200 rounded-md text-purple-500 hover:underline'
                  >
                    <File></File>
                    <p className='line-clamp-1'>{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
