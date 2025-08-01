import { Link, useParams } from "react-router-dom";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import type { jobType } from "../../types/JobType";
import { Avatar, Button, Flex, Group, Text, Title } from "@mantine/core";
import { Briefcase, IndianRupee, MapPin, MoveLeft, Zap } from "lucide-react";
import type { UserType } from "../../types/UserType";
import {
  SESSION_KEY_UPDATE_JOB,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";

const JobDetailsPage = () => {
  const { id } = useParams();

  const [jobDetails, setJobDetails] = useState<jobType>();
  const [userData, setUserData] = useState<UserType>();

  async function getUserData() {
    const user = localStorage.getItem(SESSION_KEY_USER);
    console.log("user data", user);
    if (user) {
      setUserData(JSON.parse(user));
    }
  }

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

  console.log("state data of job details ", jobDetails);

  useEffect(() => {
    getJobDetails();
    getUserData();
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
                src={jobDetails?.companyImage}
                alt="Company Logo"
                size={"lg"}
              />
              <Flex direction={"column"}>
                <Title order={5}>{jobDetails?.jRole}</Title>
                <Text size="md">
                  {jobDetails?.companyName} | No. of Openings:{" "}
                  {jobDetails?.jNoOpening}
                </Text>
              </Flex>
            </Group>
            {userData?.role === "applicant" && (
              <Button variant="light" size="xs">
                Apply Now
              </Button>
            )}
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
            <Text>{jobDetails?.companyAbout}</Text>
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
  );
};

export default JobDetailsPage;
