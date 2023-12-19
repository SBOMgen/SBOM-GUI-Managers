import { BrowserRouter, Routes, Route } from "react-router-dom";
import Repos from "./pages/Repos";
import Navbar from "./components/Navbar";
import Workflows from "./pages/Workflows";
import Login from "./pages/Login";
import ReposPage from "./pages/ReposPage";
import WorkflowsPage from "./pages/WorkflowsPage";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/repos" element={<ReposPage />} />
                    <Route path="/workflow/:name/:repo" element={<WorkflowsPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
