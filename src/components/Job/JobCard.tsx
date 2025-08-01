import { Avatar, Button, Flex, Group, Text, Title } from "@mantine/core";
import type { jobType } from "../../types/JobType";
import { useNavigate } from "react-router-dom";

const JobCard = ({ data }: { data: jobType }) => {
  const navigator = useNavigate();
  return (
    <div className="bg-neutral-900 p-3 space-y-2.5 rounded-xl hover:border hover:border-neutral-600">
      {/* image, role, name */}
      <Group>
        <Avatar src={data.companyImage} alt="Company Logo" size={"md"} />
        <Flex direction={"column"}>
          <Title order={5}>{data.jRole}</Title>
          <Text size="sm">{data.companyName}</Text>
        </Flex>
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
