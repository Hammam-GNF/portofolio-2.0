import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingRoutes from "../routes/LandingRoutes";
import ProjectRoutes from "../routes/ProjectRoutes";

import NotFoundPage from "../Pages/404";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingRoutes />} />
                <Route path="/project/:id" element={<ProjectRoutes />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
