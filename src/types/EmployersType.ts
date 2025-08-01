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
