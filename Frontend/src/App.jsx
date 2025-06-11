import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import CreateJob from "./pages/CreateJobs.jsx";
import UserPage from "./pages/UserPage.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import MyJobs from "./pages/MyJob.jsx";
import ApplyJob from "./pages/ApplyJob.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobs" element={<CreateJob />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />
        <Route path="/myjob" element={<MyJobs />} />
        <Route path="/applyjob/:id" element={<ApplyJob />} />
        
      </Routes>
    </Router>
  );
}
