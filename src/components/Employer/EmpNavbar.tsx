import { Link, useLocation } from "react-router-dom";
import { Button, Group } from "@mantine/core";
import { BriefcaseBusiness, CircleUserRound, House } from "lucide-react";
import { PageStateEnum } from "../../types/EmployersType";

const EmpNavbar = () => {
  const location = useLocation();
  const pageState =
    location.pathname === "/employer/company-profile"
      ? PageStateEnum.PROFILE
      : PageStateEnum.HOME;

  return (
    <nav className="flex flex-row justify-between p-5">
      {/* logo */}
      <Link
        to={"/employer"}
        className="flex flex-row text-2xl justify-center items-center font-bold cursor-pointer space-x-3"
      >
        <BriefcaseBusiness size={30} />
        <span>JOBPortal</span>
      </Link>

      {/* create job, find talent/accept applicant */}
      <Group>
        <Link to={"/create-job"}>
          <Button variant="transparent">CREATE JOB</Button>
        </Link>
        <Link to={"/find-talent"}>
          <Button variant="transparent">FIND TALENT</Button>
        </Link>
      </Group>

      {/* profile profile page button */}
      {pageState === PageStateEnum.HOME && (
        <Link to={"/employer/company-profile"}>
          <Button variant="filled" leftSection={<CircleUserRound size={20} />}>
            Company Profile
          </Button>
        </Link>
      )}
      {/* home page button */}
      {pageState === PageStateEnum.PROFILE && (
        <Link to={"/employer"}>
          <Button
            variant="filled"
            leftSection={<House size={20} />}
            className="space-x-1"
          >
            Home
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default EmpNavbar;
