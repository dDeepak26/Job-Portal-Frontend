import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SimpleGrid, Title } from "@mantine/core";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import axios from "axios";
import {
  SESSION_KEY_EMPLOYERS_JOBS,
  SESSION_KEY_TOKEN,
} from "../../constants/sessionConstants";
import type { ApplicationType } from "../../types/ApplicationsType";
import type { jobType } from "../../types/JobType";
import ApplicantCard from "../../components/Employer/ApplicantCard";

const EmpJobApplicantsPage = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
  const [applicants, setApplicants] = useState<ApplicationType[]>([]);
  const [jobRole, setJobRole] = useState<string>("");

  // getting employer job from local storage to get the job role by comparing the id
  function getJobRole() {
    try {
      const empJobs = localStorage.getItem(SESSION_KEY_EMPLOYERS_JOBS);

      if (empJobs) {
        const empJobsObj = JSON.parse(empJobs);

        const matchedJob = empJobsObj.find(
          (data: jobType) => data._id?.toString() === id?.toString()
        );

        setJobRole(matchedJob?.jRole);
      }
    } catch (error) {
      console.error("Error in getting the job role");
    }
  }

  // get applicants for a specific job
  async function getApplicantsForJob() {
    try {
      const applicantsData = await axios.get(
        `http://localhost:8080/api/application/applicants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("applicants data", applicantsData.data);
      setApplicants(applicantsData.data);
    } catch (error) {
      console.error(
        "error in getting the applicants for the specified job",
        error
      );
    }
  }

  useEffect(() => {
    getApplicantsForJob();
    getJobRole();
  }, []);

  return (
    <div>
      <EmpNavbar />
      <Title order={3} className={"text-center"} mb={"lg"}>
        Applicants for the job Role <span className="underline">{jobRole}</span>
      </Title>
      <SimpleGrid cols={2} p="md">
        {applicants.map((data, index) => (
          <React.Fragment key={index}>
            <ApplicantCard
              data={data}
              getApplicantsForJob={() => getApplicantsForJob()}
            />
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default EmpJobApplicantsPage;
