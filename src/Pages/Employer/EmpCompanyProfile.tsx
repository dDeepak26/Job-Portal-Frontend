import {
  Avatar,
  Button,
  FileInput,
  Flex,
  Group,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import EmpNavbar from "../../components/Employer/EmpNavbar";
import {
  SESSION_KEY_COMPANY_PROFILE,
  SESSION_KEY_TOKEN,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";
import { useEffect, useState } from "react";
import type { CompanyProfileType } from "../../types/EmployersType";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import axios from "axios";

const EmpCompanyProfile = () => {
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
  const user = localStorage.getItem(SESSION_KEY_USER);
  if (user) {
    var userObj = JSON.parse(user);
  }

  // states
  const [companyProfileData, setCompanyProfileData] =
    useState<CompanyProfileType>();
  const [opened, { open, close }] = useDisclosure(false);

  // update company profile
  function handleCreateUpdateCompanyProfile(values: CompanyProfileType) {
    axios
      .put(`http://localhost:8080/api/company-profile`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("company profile updated with data ", response);
        setCompanyProfileData(response.data.updatedCompanyProfile);
      })
      .catch((error) => {
        console.error("Error in updating the company profile ", error);
      });
  }

  // fetch company profile data by user id and storing it in state
  async function getCompanyProfile() {
    const token = sessionStorage.getItem(SESSION_KEY_TOKEN);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/company-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "response from the api from get company profile data ",
        response.data
      );
      const companyData = JSON.stringify(response.data);
      console.log("stringify company data ", companyData);
      localStorage.setItem(SESSION_KEY_COMPANY_PROFILE, companyData);
      setCompanyProfileData(response.data);
      form.setValues({
        companyName: response.data.companyName,
        companyAbout: response.data.companyAbout,
      });
    } catch (error) {
      console.error(
        "Error in getting the company profile data (catch) client ",
        error
      );
    }
  }

  // modal form config
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      companyName: "",
      companyAbout: "",
      companyImage: null,
    },
    validate: {
      companyName: (value) =>
        /^[a-zA-Z0-9&.,\-() ]{2,100}$/.test(value || "")
          ? null
          : "Invalid Company Name",
      companyAbout: (value) =>
        /^[a-zA-Z0-9\s.,'"\-()&@!?]{10,1000}$/.test(value || "")
          ? null
          : "Invalid company About",
    },
  });

  useEffect(() => {
    getCompanyProfile();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update Company Profile"
        centered
      >
        {/* Modal content */}
        <form
          // on update function logic
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            // calling api
            handleCreateUpdateCompanyProfile(values);
            close();
          })}
          className="space-y-2"
        >
          <TextInput
            withAsterisk
            label="Company name"
            type="text"
            key={form.key("companyName")}
            {...form.getInputProps("companyName")}
          />
          <Textarea
            withAsterisk
            label="Company About"
            resize="vertical"
            key={form.key("companyAbout")}
            {...form.getInputProps("companyAbout")}
          />
          <FileInput
            withAsterisk
            label="Select new Company Profile Image"
            placeholder="select company profile image"
            mb={"md"}
            key={form.key("companyImage")}
            {...form.getInputProps("companyImage")}
          />
          <Button color="yellow" type="submit" fullWidth>
            Update
          </Button>
        </form>
      </Modal>
      <div>
        <EmpNavbar />
        {/* main content */}
        <div>
          {/* employer details */}
          <div className="bg-gray-800 border rounded-2xl m-5 p-7">
            <Flex gap="md" justify="center" direction="column" wrap="wrap">
              <Text>Your Details</Text>
              {/* name and email*/}
              <Group>
                <Text>
                  <span className="font-semibold">Name:</span>{" "}
                  {userObj.fullName}
                </Text>
                <Text>
                  <span className="font-semibold">Email: </span>
                  {userObj.email}
                </Text>
              </Group>
            </Flex>
          </div>

          {/* company detail */}
          <div className="bg-gray-800 border rounded-2xl m-5 p-7">
            <Group justify="space-between">
              <Text size="lg" fw={600} mb="sm">
                Company Details
              </Text>
              <Button variant="light" color="yellow" onClick={open}>
                Update
              </Button>
            </Group>

            <Flex
              direction="row"
              gap="xl"
              align="flex-start"
              justify="flex-start"
              wrap="nowrap"
            >
              {/* Image on the left */}
              <Avatar
                src={companyProfileData?.companyImage}
                alt="Company Logo"
                size={120}
                radius="md"
              />

              {/* Text on the right */}
              <Flex direction="column" gap="xs" style={{ flex: 1 }}>
                <Text size="md" fw={500}>
                  Name:{" "}
                  {companyProfileData?.companyName
                    ? companyProfileData.companyName
                    : "___"}
                </Text>
                <Text
                  size="sm"
                  style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
                >
                  About:{" "}
                  {companyProfileData?.companyAbout
                    ? companyProfileData?.companyAbout
                    : "___"}
                </Text>
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpCompanyProfile;
