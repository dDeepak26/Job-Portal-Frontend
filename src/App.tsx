import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import EmployerPage from "./Pages/Employer/EmployerPage";
import EmpCompanyProfile from "./Pages/Employer/EmpCompanyProfile";
import JobDetailsPage from "./Pages/Job/JobDetailsPage";
import NoPage from "./Pages/NoPage";
import CreateUpdateJobPage from "./Pages/Job/CreateUpdateJobPage";
import { Notifications } from "@mantine/notifications";
import ApplicantPage from "./Pages/Applicant/ApplicantPage";
import ApplicantProfilePage from "./Pages/Applicant/ApplicantProfilePage";
import AppliedJobsPage from "./Pages/Applicant/AppliedJobsPage";
import SavedJobsPages from "./Pages/Applicant/SavedJobsPages";
import FindTalentPage from "./Pages/Employer/FindTalentPage";
import EmpJobApplicantsPage from "./Pages/Employer/EmpJobApplicantsPage";
import { ApplicantProtectRoutes, EmployerProtectRoutes } from "./ProtectRoutes";

const App = () => {
  return (
    <>
      <Notifications position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<HomePage />} />

          {/* auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* applicant routes */}
          <Route element={<ApplicantProtectRoutes />}>
            <Route path="/applicant" element={<ApplicantPage />} />
            <Route path="/applicant-profile" element={<ApplicantProfilePage />} />
            <Route path="/applied-jobs" element={<AppliedJobsPage />} />
            <Route path="/saved-jobs" element={<SavedJobsPages />} />
          </Route>

          {/* employer routes */}
          <Route element={<EmployerProtectRoutes />}>
            <Route path="/employer" element={<EmployerPage />} />
            <Route
              path="/employer/company-profile"
              element={<EmpCompanyProfile />}
            />
            <Route path="/employer/find-talent" element={<FindTalentPage />} />
            <Route
              path="/employer/find-talent/applicants/:id"
              element={<EmpJobApplicantsPage />}
            />
            {/* employer job routes */}
            <Route path="/create-job" element={<CreateUpdateJobPage />} />
            <Route path="/update-job" element={<CreateUpdateJobPage />} />
          </Route>

          {/* jobs routes */}
          <Route path="/job-details/:id" element={<JobDetailsPage />} />


          {/* no page */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
