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
            <JobCard
              companyImage={data.employerId?.companyImage}
              companyName={data.employerId?.companyName}
              jobId={data.jobId?._id}
              jRole={data.jobId?.jRole}
              jLocation={data.jobId?.jLocation}
              jMode={data.jobId?.jMode}
              jResponsibility={data.jobId?.jResponsibility}
              jSalary={data.jobId?.jSalary}
              jStatus={data.status}
              createdAt={data.jobId?.createdAt}
            />
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default AppliedJobsPage;
