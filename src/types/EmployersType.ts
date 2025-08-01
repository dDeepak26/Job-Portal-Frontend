// company profile type
export type CompanyProfileType = {
  _id?: string;
  employerId?: string;
  employerName?: string;
  employerEmail?: string;
  companyName: string;
  companyAbout: string;
  companyImage: string | null;
};

// enum for page navigation
export enum PageStateEnum {
  HOME = "HomePage",
  PROFILE = "CompanyProfilePage",
}
