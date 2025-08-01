import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";

const NavBarAuth = () => {
  return (
    <nav className="flex flex-row justify-between p-5">
      <h1 className="text-xl font-bold cursor-pointer">JobPortal</h1>
      <Link to={"/"}>
        <Button variant="outline">
          <ArrowLeft size={20} /> Back
        </Button>
      </Link>
    </nav>
  );
};

export default NavBarAuth;
