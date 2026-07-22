import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import AnimatedBackground from "../features/home/components/Background";

import Home from "../features/home/pages/Home";
import About from "../Pages/About";
import Portofolio from "../Pages/Portofolio";
import ContactPage from "../features/contact/pages/Contact";
import WelcomeScreen from "../Pages/WelcomeScreen";

import LandingLayout from "../layouts/LandingLayout";

const LandingRoutes = () => {
    const [showWelcome, setShowWelcome] = useState(true);

    return (
        <LandingLayout>
            <AnimatePresence mode="wait">
                {showWelcome && (
                    <WelcomeScreen
                        onLoadingComplete={() => setShowWelcome(false)}
                    />
                )}
            </AnimatePresence>

            {!showWelcome && (
                <>
                    <Navbar />
                    <AnimatedBackground />

                    <Home />
                    <About />
                    <Portofolio />
                    <ContactPage />
                </>
            )}
        </LandingLayout>
    );
};

export default LandingRoutes;
