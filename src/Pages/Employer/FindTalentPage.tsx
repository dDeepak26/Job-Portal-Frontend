import { useEffect, useState } from "react";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import { SESSION_KEY_EMPLOYERS_JOBS } from "../../constants/sessionConstants";
import type { jobType } from "../../types/JobType";
import { Flex, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const FindTalentPage = () => {
  const [jobsData, setJobsData] = useState<jobType[]>([]);

  // get employer job from local storage
  function getJobOfEmployer() {
    const empJobs = localStorage.getItem(SESSION_KEY_EMPLOYERS_JOBS);
    if (empJobs) {
      setJobsData(JSON.parse(empJobs));
    }
  }

  useEffect(() => {
    getJobOfEmployer();
  }, []);

  console.log("employer job data from local storage ", jobsData);

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
              <Link
                to={`/employer/find-talent/applicants/${data._id}`}
                className="bg-neutral-900 p-3 space-y-2.5 rounded-xl hover:border hover:border-neutral-600 cursor-pointer"
                key={index}
              >
                <Flex direction={"column"} gap={"md"}>
                  <Group justify="space-between">
                    <Text fw={900}>{data.jRole}</Text>
                    <Text>{data.jLocation}</Text>
                  </Group>
                  <Text size="sm">{data.jResponsibility}</Text>
                </Flex>
              </Link>
            ))}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
};

export default FindTalentPage;
