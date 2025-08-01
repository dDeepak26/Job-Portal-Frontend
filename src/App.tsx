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

          {/* employer routes */}
          <Route path="/employer" element={<EmployerPage />} />
          <Route
            path="/employer/company-profile"
            element={<EmpCompanyProfile />}
          />

          {/* job */}
          <Route path="/job-details/:id" element={<JobDetailsPage />} />
          <Route path="/create-job" element={<CreateUpdateJobPage />} />
          <Route path="/update-job" element={<CreateUpdateJobPage />} />

          {/* no page */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
