import NavbarRoutes from "@/components/navbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./courseMobileSidebar";

interface CourseNavbarProps {
  course: Course & { chapters: (Chapter & { userProgress: UserProgress[] })[] };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      ></CourseMobileSidebar>
      <NavbarRoutes></NavbarRoutes>
    </div>
  );
};

export default CourseNavbar;
