import {
  Avatar,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import type { ApplicationType } from "../../types/ApplicationsType";
import axios from "axios";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const ApplicantCard = ({
  data,
  getApplicantsForJob,
}: {
  data: ApplicationType;
  getApplicantsForJob: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);

  // get company info
  const user = localStorage.getItem(SESSION_KEY_USER);
  if (user) {
    var userObj = JSON.parse(user);
    // setJobRole(matchedJob?.jRole);
  }

  // date format to get applied on date
  const dataDate = new Date(data.createdAt);
  const formattedDate = dataDate.toLocaleString();

  //   change the job status function
  function handleUpdateStatus(
    status: string,
    dateTime?: string,
    location?: string
  ) {
    axios
      .put(
        `http://localhost:8080/api/application/status/update/${data._id}`,
        {
          applicantId: data.applicantId?._id,
          status: status,
          dateTime: dateTime,
          location: location,
          companyName: userObj.companyName,
          jRole: data.jobId?.jRole,
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

  // handle accept applicant
  async function handleAcceptApplicant(values: any) {
    try {
      await handleUpdateStatus("Accepted", values.dateTime, values.location);
      form.reset();
      close();
      notifications.show({
        title: "Interview Invitation Send",
        message: "Interview invitation send",
        color: "green",
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.log("Error in accepting the applicant");
    }
  }

  // form config mantine
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      dateTime: "",
      location: "",
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Accept Applicant" centered>
        {/* Modal content */}
        <form
          onSubmit={form.onSubmit(async (values) =>
            handleAcceptApplicant(values)
          )}
          className={"space-y-5"}
        >
          <DateTimePicker
            withAsterisk
            valueFormat="DD MMM YYYY hh:mm A"
            label="Pick date and time to Schedule Interview"
            placeholder="Pick date and time Schedule Interview and mail will be send"
            timePickerProps={{
              withDropdown: true,
              popoverProps: { withinPortal: false },
              format: "12h",
            }}
            key={form.key("dateTime")}
            {...form.getInputProps("dateTime")}
          />
          <TextInput
            withAsterisk
            label="Interview Location"
            placeholder="enter interview location"
            key={form.key("location")}
            {...form.getInputProps("location")}
          />
          <Button
            fullWidth
            variant="light"
            color="green"
            type="submit"
            // onClick={() => handleUpdateStatus("Accepted")}
          >
            Accept
          </Button>
        </form>
      </Modal>
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
          {data.status === "Applied" ? (
            <>
              <Button variant="light" color="green" onClick={open}>
                Accept
              </Button>
              <Button
                variant="light"
                color="red"
                onClick={() => handleUpdateStatus("Rejected")}
              >
                Reject
              </Button>
            </>
          ) : data.status === "Accepted" ? (
            <Button
              variant="light"
              color="red"
              onClick={() => handleUpdateStatus("Rejected")}
            >
              Reject
            </Button>
          ) : (
            <Button variant="light" color="green" onClick={open}>
              Accept
            </Button>
          )}
        </Group>
      </div>
    </>
  );
};

export default ApplicantCard;
