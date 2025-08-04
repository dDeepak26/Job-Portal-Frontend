import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Group, Menu } from "@mantine/core";
import { BriefcaseBusiness } from "lucide-react";
import { IconLogout2, IconUser } from "@tabler/icons-react";
import { SESSION_KEY_USER } from "../../constants/sessionConstants";
import type { CompanyProfileType } from "../../types/EmployersType";

const EmpNavbar = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState<CompanyProfileType>();

  useEffect(() => {
    const user = localStorage.getItem(SESSION_KEY_USER);
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  // logout logic
  function handleLogout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      navigator("/", { replace: true });
    } catch (error) {
      console.error("Error in logout ", error);
    }
  }

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
        <Link to={"/employer/find-talent"}>
          <Button variant="transparent">FIND TALENT</Button>
        </Link>
      </Group>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Group justify="center" gap={"xs"} className={"cursor-pointer"}>
            <Avatar src={user?.companyImage} size={"md"} />
            {user?.companyName}
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<IconUser size={14} />}>
            <Link to={"/employer/company-profile"}>Company Profile</Link>
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconLogout2 size={14} />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </nav>
  );
};

export default EmpNavbar;
