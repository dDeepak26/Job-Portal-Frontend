import { Avatar, Button, Flex, Group, Text, Title } from "@mantine/core";
import type { jobType } from "../../types/JobType";
import { useNavigate } from "react-router-dom";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClock,
} from "@tabler/icons-react";
import axios from "axios";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";
import { useEffect, useState } from "react";
import { timeAgo } from "../../utils/timeAgo";

const JobCard = ({
  companyImage,
  companyName,
  jobId,
  jRole,
  jLocation,
  jMode,
  jResponsibility,
  jSalary,
  jStatus,
  createdAt,
}: {
  companyImage: string | undefined | null;
  companyName: string | undefined;
  jobId: string | undefined;
  jRole: string;
  jLocation: string;
  jMode: string;
  jResponsibility: string;
  jSalary: number | null;
  jStatus?: "Applied" | "Accepted" | "Rejected";
  createdAt?: string;
}) => {
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
          <Avatar src={companyImage} alt="Company Logo" size={"md"} />
          <Flex direction={"column"}>
            <Title order={5}>{jRole}</Title>
            <Text size="sm">{companyName}</Text>
          </Flex>
        </Group>
        {/* save job */}
        {userObj.role === "applicant" && (
          <Text
            onClick={() => {
              console.log("bookmarked clicked with id ", jobId);
              if (jobId) {
                handleSaveJob(jobId);
              }
            }}
            className={"cursor-pointer"}
          >
            {savedJobId.some(
              (obj) => obj._id?.toString() === jobId?.toString()
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
          {jMode}
        </Text>
        <Text size="sm" c={"blue"} bg={"gray"} p={"4"} className={"rounded-md"}>
          {jLocation}
        </Text>
      </Group>
      {/* description */}
      <Text lineClamp={3} size="sm">
        {jResponsibility}
      </Text>
      {/* salary & time */}
      <Group justify="space-between" mt={"md"}>
        <Text fw={700}>₹{jSalary}LPA</Text>
        {createdAt && (
          <Text size="sm" className={"flex flex-row"}>
            <IconClock className={"mr-2"} />
            {timeAgo(createdAt)}
          </Text>
        )}
      </Group>
      {/* status */}
      {jStatus && (
        <Button
          color={
            jStatus === "Rejected"
              ? "red"
              : jStatus === "Accepted"
              ? "green"
              : "gray"
          }
          variant="light"
          fullWidth
        >
          {jStatus}
        </Button>
      )}
      {/* view detail button */}
      <Button
        variant="light"
        fullWidth
        onClick={() => {
          navigator(`/job-details/${jobId}`);
        }}
      >
        View Job
      </Button>
    </div>
  );
};

export default JobCard;
