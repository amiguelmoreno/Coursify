import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import CourseSidebar from "./courseSidebar";

interface CourseMobileSidebarProps {
  course: Course & { chapters: (Chapter & { userProgress: UserProgress[] })[] };
  progressCount: number;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent side={"left"} className='p-0 bg-white w-72'>
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        ></CourseSidebar>
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
