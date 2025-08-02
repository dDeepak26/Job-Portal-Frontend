import axios from "axios";
import {
  SESSION_KEY_APPLIED_JOBS,
  SESSION_KEY_TOKEN,
} from "../../constants/sessionConstants";
import React, { useEffect, useState } from "react";
import AppNavbar from "../../components/Applicant/AppNavBar";
import { SimpleGrid } from "@mantine/core";
import JobCard from "../../components/Job/JobCard";
import type { ApplicationType } from "../../types/ApplicationsType";

const AppliedJobsPage = () => {
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
  const [appliedJobs, setAppliedJobs] = useState<ApplicationType[]>([]);

  console.log("state data applied jobs", appliedJobs);
  // if (appliedJobs) {
  //   const first = appliedJobs[0];
  //   const obj = { ...first, ...first.jobId };
  //   console.log("passed object", obj);
  // }

  // get jobs data
  function getAppliedJobs() {
    axios
      .get("http://localhost:8080/api/application/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("applied jobs data", response.data);
        setAppliedJobs(response.data);
        const data = JSON.stringify(response.data);
        localStorage.setItem(SESSION_KEY_APPLIED_JOBS, data);
      })
      .catch((error) => {
        console.error("error in getting applied jobs data", error);
      });
  }

  useEffect(() => {
    getAppliedJobs();
  }, []);
  return (
    <div>
      <AppNavbar />
      <SimpleGrid cols={4} p={"md"}>
        {appliedJobs.map((data, index) => (
          <React.Fragment key={index}>
            <JobCard data={{ ...data.jobId, ...data }} />
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default AppliedJobsPage;
