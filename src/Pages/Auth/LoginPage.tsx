import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";
import NavBarAuth from "../../components/Auth/NavBarAuth";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import type { UserType } from "../../types/UserType";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";

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
  const handleLoginSubmit = (values: UserType) => {
    console.log(values);
    axios
      .post("http://localhost:8080/api/auth/login", values)
      .then((response) => {
        console.log("response data from login api ", response.data);
        form.reset();
        if (response.data.user.role === "applicant") {
          navigator("/", { replace: true });
        } else if (response.data.user.role === "employer") {
          navigator("/employer", { replace: true });
        }
        setErrorMessage("");
        sessionStorage.setItem(SESSION_KEY_TOKEN, response.data.token);
        localStorage.setItem(
          SESSION_KEY_USER,
          JSON.stringify(response.data.user)
        );
      })
      .catch((error) => {
        console.error("Error in login submitting (catch) ", error);
        console.error("error from backend", error.response.data.errorMessage);
        if (error.response.data.errorMessage) {
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
          <h1 className="text-2xl font-bold mb-4 text-start">Login</h1>
          {/* login form */}
          <form
            // handle submit logic
            onSubmit={form.onSubmit((values) => handleLoginSubmit(values))}
            className="min-w-full"
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
