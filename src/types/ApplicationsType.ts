import type { CompanyProfileType } from "./EmployersType";
import type { jobType } from "./JobType";
import type { applicantType } from "./UserType";

export type ApplicationType = {
  _id?: string;
  jobId: jobType;
  applicantId: applicantType;
  employerId: CompanyProfileType;
  status: "Applied" | "Accepted" | "Rejected";
  resumeUrl: string;
  createdAt: string;
  updatedAt: string;
};
