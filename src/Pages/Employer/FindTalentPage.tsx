import React, { useEffect, useState } from "react";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import {
  SESSION_KEY_EMPLOYERS_JOBS,
  SESSION_KEY_TOKEN,
} from "../../constants/sessionConstants";
import type { jobType } from "../../types/JobType";
import { Flex, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";
import type { ApplicationTypeArray } from "../../types/ApplicationsType";

const FindTalentPage = () => {
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
  const [jobsData, setJobsData] = useState<jobType[]>([]);
  const [applicants, setApplicants] = useState<ApplicationTypeArray[]>([]);

  // get employer job from local storage
  async function getJobOfEmployer() {
    const empJobs = await localStorage.getItem(SESSION_KEY_EMPLOYERS_JOBS);
    if (empJobs) {
      setJobsData(JSON.parse(empJobs));
      console.log("log called when job data is set", jobsData);
    }
  }

  // get applicants for all specified job id
  async function getApplicantsForJob(
    jobId: string
  ): Promise<ApplicationTypeArray[]> {
    try {
      console.log("getApplicantsForJob is called with jobId", jobId);
      const res = await axios.get(
        `http://localhost:8080/api/application/applicants/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("applicants data", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching applicants for job:", jobId, error);
      return [];
    }
  }

  // getting each job applicant and saving in state
  async function getApplicantsForAllJob() {
    const allApplicants: ApplicationTypeArray[] = [];

    for (const job of jobsData) {
      if (job._id) {
        const applicantsForJob = await getApplicantsForJob(job._id);
        allApplicants.push(...applicantsForJob);
      }
    }

    setApplicants(allApplicants);
  }

  // getting the job of employer on page mount
  useEffect(() => {
    getJobOfEmployer();
  }, []);

  // getting all applicant details if jobsDetails is present
  useEffect(() => {
    if (jobsData.length > 0) {
      getApplicantsForAllJob();
    }
  }, [jobsData]);

  console.log("employer job data from local storage ", jobsData);
  console.log("all applicant data for all jobs ", applicants);

  return (
    <div>
      <EmpNavbar />
      <Title order={3} className={"text-center"} mb={"lg"}>
        Find Talent For Role
      </Title>
      <div className="flex justify-center">
        <div className="w-1/3">
          <SimpleGrid cols={1} spacing={"lg"}>
            {jobsData.map((data, index) => (
              <React.Fragment key={index}>
                {applicants.some((app) => app.jobId._id === data._id) && (
                  <Link
                    to={`/employer/find-talent/applicants/${data._id}`}
                    className="bg-neutral-900 p-3 space-y-2.5 rounded-xl hover:border hover:border-neutral-600 cursor-pointer"
                  >
                    <Flex direction={"column"} gap={"md"}>
                      <Group justify="space-between">
                        <Text fw={900}>{data.jRole}</Text>
                        <Text>{data.jLocation}</Text>
                      </Group>
                      <Text size="sm">{data.jResponsibility}</Text>
                      <Text size="sm">
                        {"Number of Applicants: "}
                        {applicants.reduce((sum, cur) => {
                          return cur.jobId._id === data._id ? sum + 1 : sum;
                        }, 0)}
                      </Text>
                    </Flex>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
};

export default FindTalentPage;
