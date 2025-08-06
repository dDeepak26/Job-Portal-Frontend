import axios from "axios";
import AppNavbar from "../../components/Applicant/AppNavBar";
import React, { useEffect, useState } from "react";
import type { jobType } from "../../types/JobType";
import {
  Button,
  Group,
  Select,
  SimpleGrid,
  Slider,
  Text,
  TextInput,
} from "@mantine/core";
import JobCard from "../../components/Job/JobCard";
import { useForm } from "@mantine/form";
import { IconFilterEdit, IconX } from "@tabler/icons-react";

const ApplicantPage = () => {
  const [jobs, setJobs] = useState<jobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<jobType[]>([]);
  console.log("job data of useState", jobs);
  console.log("filtered job data of useState", filteredJobs);

  // get all jobs posted
  async function getAllJobs() {
    try {
      const jobsData = await axios.get("http://localhost:8080/api/job");
      if (jobsData) {
        setJobs(jobsData.data);
        setFilteredJobs(jobsData.data);
      }
    } catch (error) {
      console.error("Error in get all jobs", error);
    }
  }

  // form config
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      searchValue: "",
      mode: "",
      salary: 10,
    },
  });

  // handle filter jobs
  function handleFilter(values: any) {
    console.log("handle filter called with data", values);

    const filterJobData = jobs.filter((job) => {
      const matchesSearch =
        !values.searchValue ||
        job.jRole.toLowerCase().includes(values.searchValue.toLowerCase()) ||
        job.jLocation
          .toLowerCase()
          .includes(values.searchValue.toLowerCase()) ||
        job.employerId?.companyName
          .toLowerCase()
          .includes(values.searchValue.toLowerCase()) ||
        job.jResponsibility
          .toLowerCase()
          .includes(values.searchValue.toLowerCase());

      const matchesMode = !values.mode || job.jMode === values.mode;

      const matchesSalary = !values.salary || job.jSalary <= values.salary;

      return matchesSearch && matchesMode && matchesSalary;
    });

    setFilteredJobs(filterJobData);
    console.log("filtered job data", filterJobData);
  }

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div>
      <AppNavbar />
      {/* filter */}
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          handleFilter(values);
        })}
      >
        <Group justify="space-between" p={"md"} grow>
          {/* text input */}
          <TextInput
            label="Search Job"
            placeholder="enter text to search"
            key={form.key("searchValue")}
            {...form.getInputProps("searchValue")}
          />
          {/* mode */}
          <Select
            label="Mode"
            data={["Remote", "Hybrid", "On Site"]}
            placeholder="enter mode role"
            key={form.key("mode")}
            {...form.getInputProps("mode")}
          />

          {/* salary range */}
          <div>
            <Text size="md" mb="md" fw={500}>
              Salary Range Upto
            </Text>
            <Slider
              defaultValue={10}
              min={1}
              max={100}
              label={(value) => `₹${value} LPA`}
              key={form.key("salary")}
              {...form.getInputProps("salary")}
            />
          </div>

          {/* apply filter button */}
        </Group>
        <div className="flex justify-end px-5">
          <Button
            variant="light"
            color="red"
            onClick={() => {
              getAllJobs();
              form.reset();
            }}
            mr={"md"}
            leftSection={<IconX size={18} />}
          >
            Clear Filter
          </Button>
          <Button type="submit" leftSection={<IconFilterEdit size={18} />}>
            Apply Filter
          </Button>
        </div>
      </form>
      <SimpleGrid cols={4} p={"md"}>
        {filteredJobs.map((data, index) => (
          <React.Fragment key={index}>
            <JobCard
              companyImage={data.employerId?.companyImage}
              companyName={data.employerId?.companyName}
              jobId={data._id}
              jRole={data.jRole}
              jLocation={data.jLocation}
              jMode={data.jMode}
              jResponsibility={data.jResponsibility}
              jSalary={data.jSalary}
              createdAt={data.createdAt}
            />
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ApplicantPage;
