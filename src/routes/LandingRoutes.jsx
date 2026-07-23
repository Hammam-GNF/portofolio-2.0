import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import AnimatedBackground from "../features/home/components/Background";

import { Home, WelcomeScreen } from "../features/home/pages";
import { Portfolio } from "../features/portfolio/pages";
import { Contact } from "../features/contact/pages";

import About from "../pages/About";

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
                    <Contact />
                </>
            )}
        </LandingLayout>
    );
};

export default LandingRoutes;
