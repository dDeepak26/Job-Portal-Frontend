import axios from "axios";
import {
  SESSION_KEY_APPLIED_JOBS,
  SESSION_KEY_TOKEN,
} from "../../constants/sessionConstants";
import React, { useEffect, useState } from "react";
import AppNavbar from "../../components/Applicant/AppNavBar";
import { SegmentedControl, SimpleGrid } from "@mantine/core";
import JobCard from "../../components/Job/JobCard";
import type { ApplicationType } from "../../types/ApplicationsType";

const AppliedJobsPage = () => {
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
  const [appliedJobs, setAppliedJobs] = useState<ApplicationType[]>([]);
  const [filteredAppliedJobs, setFilteredAppliedJobs] = useState<
    ApplicationType[]
  >([]);
  const [filterState, setFilterState] = useState<string>("All");
  console.log("filter state", filterState);

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
        // console.log("applied jobs data", response.data);
        setAppliedJobs(response.data);
        setFilteredAppliedJobs(response.data);
        const data = JSON.stringify(response.data);
        localStorage.setItem(SESSION_KEY_APPLIED_JOBS, data);
      })
      .catch((error) => {
        console.error("error in getting applied jobs data", error);
      });
  }

  // change the appliedJobs based on status
  function changeAppliedJobs(status: string) {
    console.log("change applied called with applied Jobs", appliedJobs);
    // let filterAppliedJobs: ApplicationType[];
    if (status === "Accepted") {
      const filterAppliedJobs = appliedJobs.filter((objData) => {
        return objData.status === "Accepted";
      });
      setFilteredAppliedJobs(filterAppliedJobs);
      console.log("filter data", filterAppliedJobs);
    } else if (status === "Rejected") {
      const filterAppliedJobs = appliedJobs.filter((objData) => {
        return objData.status === "Rejected";
      });
      setFilteredAppliedJobs(filterAppliedJobs);
      console.log("filter data", filterAppliedJobs);
    } else if (status === "All") {
      const filterAppliedJobs = appliedJobs.filter((objData) => {
        return objData.status === "Accepted" || "Rejected" || "Applied";
      });
      setFilteredAppliedJobs(filterAppliedJobs);
      console.log("filter data", filterAppliedJobs);
    }
  }

  useEffect(() => {
    getAppliedJobs();
  }, []);

  useEffect(() => {
    changeAppliedJobs(filterState);
  }, [filterState]);
  return (
    <div>
      <AppNavbar />
      <div className="flex justify-center items-center">
        <SegmentedControl
          value={filterState}
          onChange={setFilterState}
          color="blue"
          data={["All", "Accepted", "Rejected"]}
        />
      </div>
      <SimpleGrid cols={4} p={"md"}>
        {filteredAppliedJobs.map((data, index) => (
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
