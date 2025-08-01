import type { applicantType } from "./UserType";

export type jobType = {
  _id?: string;
  employerId?: string;
  companyName?: string;
  companyAbout?: string;
  companyImage?: string;
  jRole: string;
  jMode: string;
  jSalary: number | null;
  jLocation: string;
  jExperience: number | null;
  jQualification: string;
  jSkills: string;
  jResponsibility: string;
  jNoOpening: number | null;
  createdAt?: string;
  updatedAt?: string;
  appliedApplicants?: applicantType[];
};
