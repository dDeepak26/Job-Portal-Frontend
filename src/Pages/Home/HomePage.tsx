import { Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SESSION_KEY_TOKEN } from "../../constants/sessionConstants";

const HomePage = () => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem(SESSION_KEY_TOKEN);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <div>
      {/* navbar */}
      <nav className="flex flex-row justify-between p-5">
        <h1 className="text-xl font-bold cursor-pointer">JobPortal</h1>
        {/* all links */}
        <Group>
          <Button variant="transparent" color="gray">
            Find Job
          </Button>
          <Button variant="transparent" color="gray">
            Find Talent
          </Button>
          <Button variant="transparent" color="gray">
            Post Jobs
          </Button>
        </Group>
        {/* login register link */}
        <Group>
          {token ? (
            <Link to={"/"}>
              {" "}
              <Button variant="filled">Profile</Button>
            </Link>
          ) : (
            <>
              <Link to={"/login"}>
                <Button variant="filled">Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button variant="outline">Register</Button>
              </Link>
            </>
          )}
        </Group>
      </nav>
    </div>
  );
};

export default HomePage;
