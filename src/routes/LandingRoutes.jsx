import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import AnimatedBackground from "../features/home/components";

import Home, { WelcomeScreen } from "../features/home/pages";
import About from "../pages/About";
import Portfolio from "../features/portfolio/pages";
import ContactPage from "../features/contact/pages";

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
                    <Portfolio />
                    <ContactPage />
                </>
            )}
        </LandingLayout>
    );
};

export default LandingRoutes;
