import {
  Button,
  Flex,
  Group,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import { useForm } from "@mantine/form";
import type { jobType } from "../../types/JobType";
import axios from "axios";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_UPDATE_JOB,
} from "../../constants/sessionConstants";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";

const CreateUpdateJobPage = () => {
  const location = useLocation();
  console.log("location path", location.pathname);

  const [updateFormData, setUpdateFormData] = useState<jobType>();
  console.log("update for data ", updateFormData);

  const skillsRegex = /^[A-Za-z0-9,\-\s]+$/;
  const textBlockRegex = /^[A-Za-z0-9\s.,'-]+$/;
  const form = useForm({
    mode: "uncontrolled",
    initialValues:
      location.pathname === "/update-job" && updateFormData
        ? {
            jRole: updateFormData?.jRole,
            jMode: updateFormData?.jMode,
            jSalary: updateFormData?.jSalary,
            jLocation: updateFormData?.jLocation,
            jExperience: updateFormData?.jExperience,
            jQualification: updateFormData?.jQualification,
            jSkills: updateFormData?.jSkills,
            jResponsibility: updateFormData?.jResponsibility,
            jNoOpening: updateFormData?.jNoOpening,
          }
        : {
            jRole: "",
            jMode: "",
            jSalary: null,
            jLocation: "",
            jExperience: null,
            jQualification: "",
            jSkills: "",
            jResponsibility: "",
            jNoOpening: null,
          },
    validate: {
      jRole: (value: string) =>
        /^[A-Za-z\s]{2,50}$/.test(value || "") ? null : "Invalid Job Role",

      jMode: (value: string) =>
        /^[A-Za-z\s]{2,30}$/.test(value || "") ? null : "Invalid Job Mode",

      jLocation: (value: string) =>
        /^[A-Za-z\s]{2,100}$/.test(value || "") ? null : "Invalid Location",

      jQualification: (value: string) =>
        /^[A-Za-z\s]{2,100}$/.test(value || "")
          ? null
          : "Invalid Qualification",

      jSkills: (value: string) =>
        skillsRegex.test(value || "") && value.length <= 200
          ? null
          : "Skills must be comma-separated (letters, numbers, dashes)",

      jResponsibility: (value: string) =>
        textBlockRegex.test(value || "") &&
        value.length >= 10 &&
        value.length <= 500
          ? null
          : "Responsibility must be 10–500 characters with letters, numbers, punctuation",
    },
  });

  // handle create
  function handleCreateJob(values: jobType) {
    console.log(values);
    const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
    axios
      .post("http://localhost:8080/api/job", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        notifications.show({
          title: "Success",
          message: "Job successfully Created!",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error(
          "error in creating job",
          error,
          error.response.data.errorMessage
        );
        notifications.show({
          title: "Error",
          message: error.response.data.errorMessage,
          color: "red",
          icon: <IconX size={18} />,
          autoClose: 3000,
        });
      });
  }

  // handle update
  function handleUpdateJob(values: jobType) {
    console.log(values);
    const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
    axios
      .put(`http://localhost:8080/api/job/${updateFormData?._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        notifications.show({
          title: "Success",
          message: "Job successfully Updated!",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error(
          "error in updating job",
          error,
          error.response.data.errorMessage
        );
        notifications.show({
          title: "Error",
          message: error.response.data.errorMessage,
          color: "red",
          icon: <IconX size={18} />,
          autoClose: 3000,
        });
      });
  }

  useEffect(() => {
    const updateData = localStorage.getItem(SESSION_KEY_UPDATE_JOB);
    if (updateData) {
      setUpdateFormData(JSON.parse(updateData));
      form.setValues(JSON.parse(updateData));
    }
  }, []);

  return (
    <div>
      <EmpNavbar />
      <Link to={"/employer"}>
        <Button
          variant="light"
          leftSection={<MoveLeft />}
          className={"fixed top-5 left-20 z-50"}
        >
          Back
        </Button>
      </Link>
      <Title order={3} className={"text-center"}>
        {location.pathname === "/create-job" ? "Create" : "Update"} Job
      </Title>
      {/* form */}
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          if (location.pathname === "/create-job") {
            handleCreateJob(values);
          } else if (location.pathname === "/update-job") {
            console.log(values);
            handleUpdateJob(values);
          }
          form.reset();
        })}
        className="flex justify-center"
      >
        <Flex
          justify="center"
          direction="column"
          wrap="wrap"
          mt={10}
          mx={50}
          className={"w-2/4 space-y-3"}
        >
          {/* role and mode */}
          <Group grow>
            <TextInput
              withAsterisk
              label="Job Role"
              placeholder="enter job role"
              key={form.key("jRole")}
              {...form.getInputProps("jRole")}
            />
            <TextInput
              withAsterisk
              label="Job Mode"
              placeholder="enter mode role"
              key={form.key("jMode")}
              {...form.getInputProps("jMode")}
            />
          </Group>
          {/* salary, experience */}
          <Group grow>
            <NumberInput
              withAsterisk
              label="Salary"
              placeholder="enter salary in Lakhs"
              min={0}
              key={form.key("jSalary")}
              {...form.getInputProps("jSalary")}
            />
            <NumberInput
              withAsterisk
              label="Experience"
              min={0}
              max={55}
              placeholder="enter experience in years"
              key={form.key("jExperience")}
              {...form.getInputProps("jExperience")}
            />
          </Group>
          {/* location, no. of opening */}
          <Group grow>
            <TextInput
              withAsterisk
              label="Location"
              placeholder="enter job Location"
              key={form.key("jLocation")}
              {...form.getInputProps("jLocation")}
            />
            <NumberInput
              withAsterisk
              label="No. of Opening"
              placeholder="enter no. of opening"
              key={form.key("jNoOpening")}
              {...form.getInputProps("jNoOpening")}
            />
          </Group>
          {/* Qualification */}
          <TextInput
            withAsterisk
            label="Qualification"
            placeholder="enter required qualification"
            key={form.key("jQualification")}
            {...form.getInputProps("jQualification")}
          />
          {/* skills */}
          <TextInput
            withAsterisk
            label="Skills"
            placeholder="enter required skills"
            key={form.key("jSkills")}
            {...form.getInputProps("jSkills")}
          />
          {/* responsibilities */}
          <Textarea
            withAsterisk
            label="Responsibilities"
            placeholder="enter responsibilities of job"
            autosize
            minRows={3}
            resize="vertical"
            key={form.key("jResponsibility")}
            {...form.getInputProps("jResponsibility")}
          />
          <Button
            type="submit"
            fullWidth
            color={location.pathname === "/create-job" ? "blue" : "yellow"}
          >
            {location.pathname === "/create-job" ? "Create" : "Update"}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default CreateUpdateJobPage;
