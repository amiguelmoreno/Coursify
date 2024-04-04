"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./searchInput";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput></SearchInput>
        </div>
      )}
      <div className='flex items-center gap-x-2 ml-auto'>
        {isTeacherPage || isCoursePage ? (
          <Link href='/'>
            <Button variant={"ghost"}>
              <LogOut className='h-4 w-4 mr-2'></LogOut>
              Exit
            </Button>
          </Link>
        ) : (
          <Link href='/teacher/courses'>
            <Button size={"sm"} variant={"ghost"}>
              Teacher Mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl='/'></UserButton>
      </div>
    </>
  );
};

export default NavbarRoutes;
