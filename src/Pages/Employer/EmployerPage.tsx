import { Flex, Group, SimpleGrid } from "@mantine/core";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import React, { useEffect, useState } from "react";
import type { jobType } from "../../types/JobType";
import axios from "axios";
import { SESSION_KEY_TOKEN } from "../../constants/sessionConstants";
import JobCard from "../../components/Job/JobCard";

const EmployerPage = () => {
  const [jobsData, setJobsData] = useState<jobType[]>([]);

  // function to get job details posted by employer
  async function getJobOfEmployer() {
    try {
      const token = sessionStorage.getItem(SESSION_KEY_TOKEN);

      const jobDataDb = await axios.get(
        "http://localhost:8080/api/job/employer/jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (jobDataDb) {
        console.log("job data from db ", jobDataDb);
        setJobsData(jobDataDb.data);
      }
    } catch (error) {
      console.error("Error in getting job data ", error);
    }
  }

  useEffect(() => {
    getJobOfEmployer();
  }, []);
  console.log("state job data ", jobsData);

  return (
    <div>
      <EmpNavbar />
      <Flex gap={"xl"} direction={"column"} justify="center">
        <Group>Filter</Group>
        <SimpleGrid cols={4} p={"md"}>
          {jobsData.map((data, index) => (
            <React.Fragment key={index}>
              <JobCard data={data} />
            </React.Fragment>
          ))}
        </SimpleGrid>
      </Flex>
    </div>
  );
};

export default EmployerPage;
