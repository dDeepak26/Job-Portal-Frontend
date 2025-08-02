export type jobType = {
  _id?: string;
  employerId?: {
    _id?: string;
    employerId?: string;
    employerName?: string;
    employerEmail?: string;
    companyName?: string;
    companyAbout?: string;
    companyImage?: string | null;
  };
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
};
