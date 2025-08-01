import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";
import NavBarAuth from "../../components/Auth/NavBarAuth";
import {
  Button,
  Group,
  PasswordInput,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import type { UserType } from "../../types/UserType";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const LoginPage = () => {
  const navigator = useNavigate();

  // states
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!()_+=\[{\]};:<>|./?,-]).{8,}$/.test(
          value
        )
          ? null
          : "Invalid password",
    },
  });

  // function to handle submit login
  const handleLoginSubmit = (values: UserType, role: string) => {
    console.log(values);
    axios
      .post(`http://localhost:8080/api/auth/login/${role}`, values)
      .then((response) => {
        console.log("response data from login api ", response.data);
        form.reset();
        // redirecting logic
        if (response.data.user.role === "applicant") {
          navigator("/applicant", { replace: true });
        } else if (response.data.user.role === "employer") {
          navigator("/employer", { replace: true });
        }
        setErrorMessage("");
        //setting token and user info
        sessionStorage.setItem(SESSION_KEY_TOKEN, response.data.token);
        localStorage.setItem(
          SESSION_KEY_USER,
          JSON.stringify(response.data.user)
        );
        notifications.show({
          title: `Welcome Back ${response.data.user.fullName}`,
          message: "Login Successful",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error in login submitting (catch) ", error);
        console.error("error from backend", error.response.data.errorMessage);
        if (error.response.data.errorMessage[0].message) {
          const errorMsg = error.response.data.errorMessage[0].message;
          setErrorMessage(errorMsg);
        } else if (error.response.data.errorMessage) {
          setErrorMessage(error.response.data.errorMessage);
        }
      });
  };

  return (
    <div className="min-h-screen  min-w-screen flex flex-col">
      {/* navbar */}
      <NavBarAuth />
      <div className="flex-grow flex justify-center items-center w-full">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded shadow-lg">
          <Tabs defaultValue="applicantLogin">
            <Tabs.List grow>
              <Tabs.Tab value="applicantLogin">Applicant Login</Tabs.Tab>
              <Tabs.Tab value="employerLogin">Employer Login</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="applicantLogin">
              <Title order={4} mt="md" className={"text-center"}>
                Applicant Login
              </Title>
              {/* login form */}
              <form
                // handle submit logic
                onSubmit={form.onSubmit((values) =>
                  handleLoginSubmit(values, "applicant")
                )}
                className="min-w-full mt-2"
              >
                {/* email */}
                <div className="flex flex-col w-75 mb-3">
                  <TextInput
                    withAsterisk
                    label="Enter Email"
                    placeholder="your@email.com"
                    type="email"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
                </div>
                <div className="flex flex-col w-75 mb-3">
                  <PasswordInput
                    withAsterisk
                    label="Enter Password"
                    placeholder="********"
                    type="password"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                  />
                </div>
                {errorMessage && (
                  <div className="flex flex-col w-75 mb-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col w-75 mb-3">
                  <Group justify="flex-end" mt="md">
                    <Button type="submit" fullWidth>
                      Login
                    </Button>
                  </Group>
                </div>
              </form>
              <p className="text-center">
                Do'nt have an account{" "}
                <Link to="/register" className="cursor-pointer underline">
                  Register
                </Link>
              </p>
            </Tabs.Panel>

            <Tabs.Panel value="employerLogin">
              <Title order={4} mt="md" className={"text-center"}>
                Employer Login
              </Title>
              {/* login form */}
              <form
                // handle submit logic
                onSubmit={form.onSubmit((values) =>
                  handleLoginSubmit(values, "employer")
                )}
                className="min-w-full mt-2"
              >
                {/* email */}
                <div className="flex flex-col w-75 mb-3">
                  <TextInput
                    withAsterisk
                    label="Enter Email"
                    placeholder="your@email.com"
                    type="email"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
                </div>
                <div className="flex flex-col w-75 mb-3">
                  <PasswordInput
                    withAsterisk
                    label="Enter Password"
                    placeholder="********"
                    type="password"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                  />
                </div>
                {errorMessage && (
                  <div className="flex flex-col w-75 mb-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}
                <div className="flex flex-col w-75 mb-3">
                  <Group justify="flex-end" mt="md">
                    <Button type="submit" fullWidth>
                      Login
                    </Button>
                  </Group>
                </div>
              </form>
              <p className="text-center">
                Do'nt have an account{" "}
                <Link to="/register" className="cursor-pointer underline">
                  Register
                </Link>
              </p>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
