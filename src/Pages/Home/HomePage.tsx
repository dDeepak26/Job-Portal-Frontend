import { Button, Group, Text, Title } from "@mantine/core";
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
      <nav className="flex flex-row justify-between p-5 fixed top-0 left-0 w-full z-50">
        <h1 className="text-xl font-bold cursor-pointer">JobPortal</h1>
        {/* all links */}
        <Group>
          <Link to={"/login"}>
            <Button variant="transparent" color="gray">
              Find Job
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button variant="transparent" color="gray">
              Find Talent
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button variant="transparent" color="gray">
              Post Jobs
            </Button>
          </Link>
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

      {/* Hero Section */}
      <main className="flex items-center justify-center text-center h-screen px-4">
        <div className="max-w-2xl">
          <Title order={1} mb={"md"}>
            Discover Your Next Opportunity
          </Title>
          <Text size="lg" mb={"md"}>
            JobPortal connects talented people with the world’s best employers.
            Whether you're hiring or looking, we make the match.
          </Text>
          <Group justify="center" gap="md">
            <Link to="/login">
              <Button size="md" color="blue" radius="xl">
                Find Jobs
              </Button>
            </Link>
            <Link to="/login">
              <Button size="md" variant="outline" color="blue" radius="xl">
                Post a Job
              </Button>
            </Link>
          </Group>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
