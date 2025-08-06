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
import AppNavbar from "../../components/Applicant/AppNavBar";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import {
  SESSION_KEY_TOKEN,
  SESSION_KEY_USER,
} from "../../constants/sessionConstants";
import type { applicantType } from "../../types/UserType";
import { useEffect, useState } from "react";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "../../components/Resume/MyDocument";
import {
  IconCheck,
  IconDownload,
  IconEye,
  IconEyeOff,
  IconFileDownload,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const ApplicantProfilePage = () => {
  const token = sessionStorage.getItem(SESSION_KEY_TOKEN);
  const [opened, { open, close }] = useDisclosure(false);
  const [profile, setProfile] = useState<applicantType>();
  const [resumeState, setResumeState] = useState<boolean>(false);

  // create profile
  function handleCreateUpdateProfile(values: applicantType) {
    axios
      .put("http://localhost:8080/api/applicant-profile", values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Profile Updated");
        if (response.data.updatedApplicantData) {
          setProfile(response.data.updatedApplicantData);
        }
      })
      .catch((error) => {
        console.error("Error in creating profile ", error);
      });
  }

  // get profile info
  async function getProfile() {
    try {
      const profileData = await axios.get(
        "http://localhost:8080/api/applicant-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (profileData.data) {
        setProfile(profileData.data);
        console.log("profile data from api call", profileData.data);
        form.setValues(profileData.data);
      }
      localStorage.setItem(SESSION_KEY_USER, JSON.stringify(profileData.data));
    } catch (error) {
      console.error("Error in getting the profile", error);
    }
  }

  // modal form config
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      aAbout: "",
      aQualifications: "",
      aExperience: "",
      aLocation: "",
      aSkills: "",
      aImage: null,
    },
    validate: {
      aImage: (value) => (!value ? "Image is Required" : null),
      aAbout: (value) =>
        /^[a-zA-Z0-9\s.,'"()&@!?-]{10,1000}$/.test(value || "")
          ? null
          : "Invalid aAbout format",

      aQualifications: (value) =>
        /^[a-zA-Z0-9\s.,'"()&@!?-]{2,500}$/.test(value || "")
          ? null
          : "Invalid aQualifications format",

      aExperience: (value) =>
        /^[a-zA-Z0-9\s.,'"()&@!?-]{2,500}$/.test(value || "")
          ? null
          : "Invalid aExperience format",

      aLocation: (value) =>
        /^[a-zA-Z0-9\s,.'-]{2,100}$/.test(value || "")
          ? null
          : "Invalid aLocation format",

      aSkills: (value) =>
        /^[a-zA-Z0-9\s.,'"()&@!?-]{2,500}$/.test(value || "")
          ? null
          : "Invalid aSkills format",
    },
  });

  // handle save resume
  const handleSaveResume = async () => {
    try {
      console.log("saved resume called");

      const pdfBlob = await pdf(<MyDocument data={profile} />).toBlob();

      // Create FormData and append PDF file
      const formData = new FormData();
      formData.append("file", pdfBlob, `${profile?.fullName || "resume"}.pdf`);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Sending formdata directly
      const res = await axios.put(
        "http://localhost:8080/api/applicant-profile/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("resume saved", res.data);
      getProfile();
      notifications.show({
        title: `Resume saved`,
        message: "Resume saved Successful",
        color: "green",
        icon: <IconCheck size={18} />,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("error in saving resume", err);
    }
  };

  // handle download
  const handleDownload = async () => {
    const blob = await pdf(<MyDocument data={profile} />).toBlob();
    const url = URL.createObjectURL(blob);

    // to save it locally
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile?.email}-Resume.pdf`; // File name
    link.click();
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Profile" centered>
        {/* Modal content */}
        <form
          // on update function logic
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            // calling api
            if (values) {
              handleCreateUpdateProfile(values);
            }
            close();
          })}
          className="space-y-2"
        >
          <Textarea
            withAsterisk
            label="Enter About yourself"
            resize="vertical"
            key={form.key("aAbout")}
            {...form.getInputProps("aAbout")}
          />
          <Textarea
            withAsterisk
            label="Enter your Qualifications"
            resize="vertical"
            key={form.key("aQualifications")}
            {...form.getInputProps("aQualifications")}
          />
          <Textarea
            withAsterisk
            label="Enter your Experience"
            resize="vertical"
            key={form.key("aExperience")}
            {...form.getInputProps("aExperience")}
          />
          <Textarea
            withAsterisk
            label="Enter your Skills"
            resize="vertical"
            key={form.key("aSkills")}
            {...form.getInputProps("aSkills")}
          />
          <TextInput
            withAsterisk
            label="Enter your Location"
            key={form.key("aLocation")}
            {...form.getInputProps("aLocation")}
          />
          <FileInput
            withAsterisk
            label="Select Profile Image"
            placeholder="select profile image"
            mb={"md"}
            key={form.key("aImage")}
            {...form.getInputProps("aImage")}
            required
          />
          <Button color={"yellow"} type="submit" fullWidth>
            Update
          </Button>
        </form>
      </Modal>
      <div>
        <AppNavbar />
        {/* main content */}
        <div>
          {/* company detail */}
          <div className="bg-gray-800 border rounded-2xl m-5 p-7">
            <Group justify="space-between">
              <Text size="lg" fw={600} mb="sm">
                Your Details
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
                src={profile?.aImage}
                alt="Company Logo"
                size={120}
                radius="md"
              />

              {/* Text on the right */}
              <Flex direction="column" gap="xs" style={{ flex: 1 }}>
                <Group>
                  <Text size="md" fw={500}>
                    Name: {profile?.fullName}
                  </Text>
                  <Text size="md" fw={500}>
                    Email: {profile?.email}
                  </Text>
                </Group>
                <Text
                  size="sm"
                  style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
                >
                  <strong>About:</strong> {profile?.aAbout}
                </Text>
                <Text>
                  <strong>Qualifications:</strong> {profile?.aQualifications}
                </Text>
                <Text>
                  <strong>Skills:</strong> {profile?.aSkills}
                </Text>
                <Text>
                  <strong>Experience:</strong> {profile?.aExperience}
                </Text>
                <Text>
                  <strong>Location:</strong> {profile?.aLocation}
                </Text>
                <Group>
                  {profile?.aAbout && (
                    <Button
                      variant="light"
                      color={!resumeState ? "blue" : "red"}
                      onClick={() => setResumeState(!resumeState)}
                      leftSection={!resumeState ? <IconEye /> : <IconEyeOff />}
                    >
                      {!resumeState ? "View Resume" : "Close Resume"}
                    </Button>
                  )}
                  {profile?.aAbout && (
                    <>
                      <Button
                        variant="light"
                        leftSection={<IconFileDownload />}
                        onClick={() => handleSaveResume()}
                      >
                        Save Resume
                      </Button>
                      <Button
                        variant="light"
                        leftSection={<IconDownload />}
                        onClick={() => handleDownload()}
                      >
                        Download Resume
                      </Button>
                    </>
                  )}
                </Group>
              </Flex>
            </Flex>
          </div>
          {resumeState && (
            <PDFViewer className="w-full h-screen">
              <MyDocument data={profile} />
            </PDFViewer>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicantProfilePage;
