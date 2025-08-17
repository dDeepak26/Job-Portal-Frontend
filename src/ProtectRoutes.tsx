import { Navigate, Outlet } from 'react-router-dom'
import { SESSION_KEY_USER } from './constants/sessionConstants'

const ApplicantProtectRoutes = () => {
    const user = localStorage.getItem(SESSION_KEY_USER);
    const userObj = JSON.parse(user || '{}');

    if (userObj.role !== "applicant") {
        return <Navigate to="/" />
    }

    return (
        <Outlet />
    )
}
const EmployerProtectRoutes = () => {
    const user = localStorage.getItem(SESSION_KEY_USER);
    const userObj = JSON.parse(user || '{}');

    if (userObj.role !== "employer") {
        return <Navigate to="/" />
    }

    return (
        <Outlet />
    )
}

export { ApplicantProtectRoutes, EmployerProtectRoutes }