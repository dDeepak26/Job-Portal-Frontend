export type UserType = {
  _id?: string;
  fullName?: string;
  email: string;
  password: string;
  role?: string;
};

// applicant type
export type applicantType = {
  _id?: string;
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
  aImage: string | null;
  aAbout: string;
  aQualifications: string;
  aExperience: string;
  aLocation: string;
  aSkills: string;
  createdAt?: string;
  updatedAt?: string;
};
