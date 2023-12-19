import { BrowserRouter, Routes, Route } from "react-router-dom";
import Repos from "./pages/Repos";
import Navbar from "./components/Navbar";
import Workflows from "./pages/Workflows";
import Login from "./pages/Login";
import ReposPage from "./pages/ReposPage";
import WorkflowsPage from "./pages/WorkflowsPage";

import Report from "./pages/Report";


const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/repos" element={<ReposPage />} />
                    <Route path="/workflow/:name/:repo" element={<WorkflowsPage />} />

                    <Route path="/repos" element={<Repos />} />
                    <Route path="/workflows" element={<Workflows />} />
                    <Route path="/report" element={<Report />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
