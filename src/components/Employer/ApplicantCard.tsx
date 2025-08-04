import { Avatar, Button, Flex, Group, Text, Title } from "@mantine/core";
import type { ApplicationType } from "../../types/ApplicationsType";
import axios from "axios";
import { SESSION_KEY_TOKEN } from "../../constants/sessionConstants";

const ApplicantCard = ({
  data,
  getApplicantsForJob,
}: {
  data: ApplicationType;
  getApplicantsForJob: () => void;
}) => {
  const dataDate = new Date(data.createdAt);
  const formattedDate = dataDate.toLocaleString();

  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);

  //   change the job status function
  function handleUpdateStatus(status: string) {
    axios
      .put(
        `http://localhost:8080/api/application/status/update/${data._id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        getApplicantsForJob();
      })
      .catch((err) => {
        console.error("error in updating the job status", err);
      });
  }

  return (
    <div className="bg-neutral-900 p-3 space-y-2.5 rounded-xl hover:border hover:border-neutral-600">
      {/* image, name, status */}
      <Group justify="space-between" grow>
        <Group>
          <Avatar
            src={data.applicantId?.aImage}
            alt="Company Logo"
            size={"md"}
          />
          <Flex direction={"column"}>
            <Title order={5}>{data.applicantId?.fullName}</Title>
            <Text size="sm">{data.applicantId?.email}</Text>
          </Flex>
        </Group>
        <Group justify="end">
          <Button
            variant="light"
            color={
              data.status === "Rejected"
                ? "red"
                : data.status === "Accepted"
                ? "green"
                : "blue"
            }
          >
            {data.status}
          </Button>
        </Group>
      </Group>

      {/* skills */}
      <Title order={5}>Skills:</Title>
      <Text lineClamp={3} size="sm" mb={"md"}>
        {data.applicantId?.aSkills}
      </Text>

      {/* experience */}
      <Title order={5}>Experience:</Title>
      <Text lineClamp={3} size="sm" mb={"md"}>
        {data.applicantId?.aExperience}
      </Text>

      {/* qualification */}
      <Title order={5}>Qualification:</Title>
      <Text lineClamp={3} size="sm" mb={"md"}>
        {data.applicantId?.aQualifications}
      </Text>

      {/* about */}
      <Title order={5}>About:</Title>
      <Text lineClamp={3} size="sm" mb={"md"}>
        {data.applicantId?.aAbout}
      </Text>

      {/* resume */}
      <Group align="center">
        <Title order={4}>Resume:</Title>
        <Text
          size="sm"
          td="underline"
          className={"cursor-pointer"}
          onClick={() => window.open(data.resumeUrl, "_blank")}
        >
          Click Me
        </Text>
      </Group>
      {/* location, applied at */}
      <Group mb={"md"} grow>
        <Group align="center">
          <Title order={6}>Location:</Title>
          <Text size="sm">{data.applicantId?.aLocation}</Text>
        </Group>
        <Group align="center">
          <Title order={6}>Applied At:</Title>
          <Text size="sm">{formattedDate}</Text>
        </Group>
      </Group>

      {/* accept reject button */}
      <Group grow>
        <Button
          variant="light"
          color="green"
          onClick={() => handleUpdateStatus("Accepted")}
        >
          Accept
        </Button>
        <Button
          variant="light"
          color="red"
          onClick={() => handleUpdateStatus("Rejected")}
        >
          Reject
        </Button>
      </Group>
    </div>
  );
};

export default ApplicantCard;
