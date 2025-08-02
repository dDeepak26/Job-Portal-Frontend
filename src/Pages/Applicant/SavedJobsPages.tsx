import React, { useEffect, useState } from "react";
import AppNavbar from "../../components/Applicant/AppNavBar";
import type { jobType } from "../../types/JobType";
import { SimpleGrid } from "@mantine/core";
import JobCard from "../../components/Job/JobCard";
import axios from "axios";
import { SESSION_KEY_TOKEN } from "../../constants/sessionConstants";

const SavedJobsPages = () => {
  const [savedJobData, setSavedJobData] = useState<jobType[]>([]);

  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);

  // to get saved jobs
  function getSavedJobsList() {
    axios
      .get("http://localhost:8080/api/job/saved/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("saved jobs lists", res.data.savedJobs);
        setSavedJobData(res.data.savedJobs);
      })
      .catch((err) => console.error("error in getting saved jobs", err));
  }

  useEffect(() => {
    getSavedJobsList();
  }, []);

  return (
    <div>
      <AppNavbar />
      <SimpleGrid cols={4} p={"md"}>
        {savedJobData.map((data, index) => (
          <React.Fragment key={index}>
            <JobCard data={data} />
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default SavedJobsPages;
