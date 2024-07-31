import { BrowserRouter, Routes, Route } from "react-router-dom";
import Repos from "./pages/Repos";
import Navbar from "./components/Navbar";
import Workflows from "./pages/Workflows";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ReposPage from "./pages/ReposPage";
import WorkflowsPage from "./pages/WorkflowsPage";
import Footer from "./components/Footer";
import Report from "./pages/Report";
import ReportPage from "./pages/ReportPage";


const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/repos" element={<ReposPage />} />
                    <Route path="/workflow/:name/:repo" element={<WorkflowsPage />} />
                    <Route path="/workflow/:name/:repo/:run_id/report" element={<ReportPage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;

