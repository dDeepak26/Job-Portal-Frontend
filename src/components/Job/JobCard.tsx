import { Avatar, Button, Flex, Group, Text, Title } from "@mantine/core";
import type { jobType } from "../../types/JobType";
import { useNavigate } from "react-router-dom";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import axios from "axios";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";
import { useEffect, useState } from "react";

const JobCard = ({ data }: { data: jobType }) => {
  const navigator = useNavigate();
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);

  const [savedJobId, setSavedJobId] = useState<jobType[]>([]);

  // get user
  const user = localStorage.getItem(SESSION_KEY_USER);
  if (user) {
    var userObj = JSON.parse(user);
  }

  // to save job
  function handleSaveJob(id: string) {
    axios
      .post(
        `http://localhost:8080/api/job/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        getSavedJobsList();
      })
      .catch((err) => {
        console.error("Error in saving", err);
      });
  }

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
        setSavedJobId(res.data.savedJobs);
      })
      .catch((err) => console.error("error in getting saved jobs", err));
  }

  if (userObj.role === "applicant") {
    useEffect(() => {
      getSavedJobsList();
    }, []);
  }

  return (
    <div className="bg-neutral-900 p-3 space-y-2.5 rounded-xl hover:border hover:border-neutral-600">
      {/* image, role, name */}
      <Group justify="space-between">
        <Group>
          <Avatar
            src={data.employerId?.companyImage}
            alt="Company Logo"
            size={"md"}
          />
          <Flex direction={"column"}>
            <Title order={5}>{data.jRole}</Title>
            <Text size="sm">{data.employerId?.companyName}</Text>
          </Flex>
        </Group>
        {/* save job */}
        {userObj.role === "applicant" && (
          <Text
            onClick={() => {
              console.log("bookmarked clicked with id ", data._id);
              if (data?._id) {
                handleSaveJob(data._id);
              }
            }}
            className={"cursor-pointer"}
          >
            {savedJobId.some(
              (obj) => obj._id?.toString() === data?._id?.toString()
            ) ? (
              <IconBookmarkFilled />
            ) : (
              <IconBookmark />
            )}
          </Text>
        )}
      </Group>
      {/* location and type */}
      <Group>
        <Text size="sm" c={"blue"} bg={"gray"} p={"4"} className={"rounded-md"}>
          {data.jMode}
        </Text>
        <Text size="sm" c={"blue"} bg={"gray"} p={"4"} className={"rounded-md"}>
          {data.jLocation}
        </Text>
      </Group>
      {/* description */}
      <Text lineClamp={3} size="sm">
        {data.jResponsibility}
      </Text>
      {/* salary & time */}
      <Group justify="space-between" mt={"md"}>
        <Text fw={700}>₹{data.jSalary}LPA</Text>
        <Text size="sm">4 days remaining</Text>
      </Group>
      {/* view detail button */}
      <Button
        variant="light"
        fullWidth
        onClick={() => {
          navigator(`/job-details/${data._id}`);
        }}
      >
        View Job
      </Button>
    </div>
  );
};

export default JobCard;
