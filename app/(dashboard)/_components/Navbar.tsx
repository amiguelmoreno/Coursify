import { Divide } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "@/components/navbarRoutes";

const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar></MobileSidebar>
      <NavbarRoutes></NavbarRoutes>
    </div>
  );
};

export default Navbar;
