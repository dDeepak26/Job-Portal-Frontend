import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Group, Menu } from "@mantine/core";
import { BriefcaseBusiness } from "lucide-react";
import { IconLogout2, IconUser } from "@tabler/icons-react";
import { SESSION_KEY_USER } from "../../constants/sessionConstants";
import { useEffect, useState } from "react";
import type { UserType } from "../../types/UserType";

const AppNavbar = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState<UserType>();

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
        to={"/applicant"}
        className="flex flex-row text-2xl justify-center items-center font-bold cursor-pointer space-x-3"
      >
        <BriefcaseBusiness size={30} />
        <span>JOBPortal</span>
      </Link>

      {/* create job, find talent/accept applicant */}
      <Group>
        <Link to={"/applicant"}>
          <Button variant="transparent">APPLIED JOBS</Button>
        </Link>
        <Link to={"/applicant"}>
          <Button variant="transparent">SAVED JOBS</Button>
        </Link>
      </Group>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Group justify="center" gap={"xs"} className={"cursor-pointer"}>
            <Avatar size={"md"} />
            {user?.fullName}
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<IconUser size={14} />}>
            <Link to={"/applicant-profile"}>Profile</Link>
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

export default AppNavbar;
