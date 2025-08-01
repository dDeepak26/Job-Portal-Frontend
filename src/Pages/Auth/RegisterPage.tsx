import { useForm } from "@mantine/form";
import NavBarAuth from "../../components/Auth/NavBarAuth";
import { Button, Group, PasswordInput, Radio, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import type { UserType } from "../../types/UserType";
import axios from "axios";
import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const RegisterPage = () => {
  const navigator = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      role: "applicant",
    },
    validate: {
      fullName: (value) =>
        /^[a-zA-Z]+ [a-zA-Z]+$/.test(value) ? null : "Invalid Full Name",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!()_+=\[{\]};:<>|./?,-]).{8,}$/.test(
          value
        )
          ? null
          : "Invalid password",
    },
  });

  // function to handle the register submit
  const handleRegisterSubmit = (values: UserType) => {
    console.log("user submitted data on register ", values);
    axios
      .post("http://localhost:8080/api/auth/register", values)
      .then((response) => {
        console.log(response);
        form.reset();
        navigator("/login", { replace: true });
        notifications.show({
          title: `Register`,
          message: "Register Successful",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error in register the user ", error);
        if (error.response.data.errorMessage[0].message) {
          setErrorMessage(error.response.data.errorMessage[0].message);
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
          <h1 className="text-2xl font-bold mb-4 text-start">Register</h1>
          {/* form */}
          <form
            onSubmit={form.onSubmit((values) => handleRegisterSubmit(values))}
            className="min-w-full"
          >
            {/* full name */}
            <div className="flex flex-col w-75 mb-3">
              <TextInput
                withAsterisk
                label="Enter Full Name"
                placeholder="John Deo"
                type="text"
                key={form.key("fullName")}
                {...form.getInputProps("fullName")}
              />
            </div>
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
            {/* role */}
            <div className="flex flex-row w-75 mb-3">
              <Radio.Group
                name="userRole"
                label="You are?"
                withAsterisk
                {...form.getInputProps("role")}
              >
                <Group>
                  <Radio value={"applicant"} label="Applicant" />
                  <Radio value={"employer"} label="Employer" />
                </Group>
              </Radio.Group>
            </div>
            {errorMessage && (
              <div className="flex flex-col w-75 mb-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}
            <div className="flex flex-col w-75 mb-3">
              <Group justify="flex-end" mt="md">
                <Button type="submit" fullWidth>
                  Register
                </Button>
              </Group>
            </div>
          </form>
          <p className="text-center">
            Already have an account{" "}
            <Link to="/login" className="underline cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
