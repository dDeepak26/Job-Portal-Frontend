import axios from "axios";
import AppNavbar from "../../components/Applicant/AppNavBar";
import React, { useEffect, useState } from "react";
import type { jobType } from "../../types/JobType";
import { SimpleGrid } from "@mantine/core";
import JobCard from "../../components/Job/JobCard";

const ApplicantPage = () => {
  const [jobs, setJobs] = useState<jobType[]>([]);

  // get all jobs posted
  async function getAllJobs() {
    try {
      const jobsData = await axios.get("http://localhost:8080/api/job");
      if (jobsData) {
        setJobs(jobsData.data);
      }
    } catch (error) {
      console.error("Error in get all jobs", error);
    }
  }

  console.log("job data of useState", jobs);

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div>
      <AppNavbar />
      <SimpleGrid cols={4} p={"md"}>
        {jobs.map((data, index) => (
          <React.Fragment key={index}>
            <JobCard data={data} />
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ApplicantPage;
