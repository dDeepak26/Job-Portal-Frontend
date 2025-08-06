import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";

const NavBarAuth = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-5 py-3">
      <div className="flex flex-row justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold cursor-pointer">JobPortal</h1>
        </Link>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBarAuth;
