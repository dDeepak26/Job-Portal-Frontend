import { Link, useParams } from "react-router-dom";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import type { jobType } from "../../types/JobType";
import {
  Avatar,
  Button,
  FileInput,
  Flex,
  Group,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { Briefcase, IndianRupee, MapPin, MoveLeft, Zap } from "lucide-react";
import type { UserType } from "../../types/UserType";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_UPDATE_JOB,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";
import AppNavbar from "../../components/Applicant/AppNavBar";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

const JobDetailsPage = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);

  const [opened, { open, close }] = useDisclosure(false);
  const [jobDetails, setJobDetails] = useState<jobType>();
  const [userData, setUserData] = useState<UserType>();
  const [jobStatus, setJobStatus] = useState<
    "Applied" | "Reviewing" | "Interview" | "Rejected" | "Hired"
  >();
  console.log("state data of job details ", jobDetails);

  // get user data
  async function getUserData() {
    const user = localStorage.getItem(SESSION_KEY_USER);
    console.log("user data", user);
    if (user) {
      setUserData(JSON.parse(user));
    }
  }

  // function to get job details
  async function getJobDetails() {
    try {
      const jobDetailsData = await axios.get(
        `http://localhost:8080/api/job/${id}`
      );
      if (jobDetailsData) {
        console.log("job details fetched with data ", jobDetailsData);
        setJobDetails(jobDetailsData.data);
      }
    } catch (error) {
      console.error("Error in getting the job details by id ", error);
    }
  }

  // function to apply to job only by applicant
  function handleApplyToJob(values: any) {
    axios
      .post(
        `http://localhost:8080/api/application/${jobDetails?._id}`,
        {
          resumeUrl: values.resumeUrl,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setJobStatus(response.data?.status);
      })
      .catch((error) => {
        console.error("Error in applying to job", error);
      });
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      resumeUrl: null,
    },
  });

  useEffect(() => {
    getJobDetails();
    getUserData();
  }, []);

  return (
    <>
      {/* apply modal */}
      <Modal opened={opened} onClose={close} title="Apply to Job " centered>
        {/* Modal content */}
        <form
          // on update function logic
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            // calling api
            handleApplyToJob(values);
            close();
          })}
          className="space-y-2"
        >
          <FileInput
            withAsterisk
            label="Select Resume"
            placeholder="select resume"
            mb={"md"}
            key={form.key("resumeUrl")}
            {...form.getInputProps("resumeUrl")}
          />
          <Button type="submit" fullWidth>
            Apply
          </Button>
        </form>
      </Modal>

      {/* main */}
      <div>
        {userData?.role === "employer" ? <EmpNavbar /> : <AppNavbar />}
        <Link to={userData?.role === "employer" ? "/employer" : "/applicant"}>
          <Button
            variant="light"
            leftSection={<MoveLeft />}
            className={"fixed top-5 left-20 z-50"}
          >
            Back
          </Button>
        </Link>
        {/* main content */}
        <div className="flex justify-center">
          <Flex
            justify="center"
            direction="column"
            wrap="wrap"
            mt={10}
            mx={50}
            className={"w-2/4"}
          >
            <Group justify="space-between" mb={"md"}>
              <Group>
                <Avatar
                  src={jobDetails?.employerId?.companyImage}
                  alt="Company Logo"
                  size={"lg"}
                />
                <Flex direction={"column"}>
                  <Title order={5}>{jobDetails?.jRole}</Title>
                  <Text size="md">
                    {jobDetails?.employerId?.companyName} | No. of Openings:{" "}
                    {jobDetails?.jNoOpening}
                  </Text>
                </Flex>
              </Group>
              {/* apply button */}
              {userData?.role === "applicant" &&
                (jobStatus ? (
                  <Button color="green" variant="light" size="xs">
                    {jobStatus}
                  </Button>
                ) : (
                  <Button variant="light" size="xs" onClick={open}>
                    Apply
                  </Button>
                ))}
            </Group>

            {/* location salary experience type */}
            <Group justify="space-evenly" p={"md"}>
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <MapPin size={40} />
                <Text size="md">{jobDetails?.jLocation}</Text>
              </Flex>
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Zap size={40} />
                <Text size="md">{jobDetails?.jMode}</Text>
              </Flex>
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Briefcase size={40} />
                <Text size="md">{jobDetails?.jExperience} YOE</Text>
              </Flex>
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <IndianRupee size={40} />
                <Text size="md">₹{jobDetails?.jSalary}LPA</Text>
              </Flex>
            </Group>

            {/* required skills */}
            <Flex direction={"column"} py={"md"}>
              <Title order={5}>Required Skills</Title>
              <Text>{jobDetails?.jSkills}</Text>
            </Flex>

            {/* Qualifications */}
            <Flex direction={"column"} py={"md"}>
              <Title order={5}>Qualifications</Title>
              <Text>{jobDetails?.jQualification}</Text>
            </Flex>

            {/* responsibilities */}
            <Flex direction={"column"} py={"md"}>
              <Title order={5}>Responsibilities</Title>
              <Text>{jobDetails?.jResponsibility}</Text>
            </Flex>

            {/* about */}
            <Flex direction={"column"} py={"md"}>
              <Title order={5}>About Company</Title>
              <Text>{jobDetails?.employerId?.companyAbout}</Text>
            </Flex>
            {userData?.role === "employer" && (
              <Link to={"/update-job"}>
                <Button
                  variant="light"
                  color="yellow"
                  fullWidth
                  onClick={() => {
                    console.log(
                      "update data button clicked with data",
                      jobDetails
                    );
                    localStorage.setItem(
                      SESSION_KEY_UPDATE_JOB,
                      JSON.stringify(jobDetails)
                    );
                  }}
                >
                  Update
                </Button>
              </Link>
            )}
          </Flex>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
