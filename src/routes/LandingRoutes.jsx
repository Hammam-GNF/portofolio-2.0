import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import AnimatedBackground from "../features/home/components/Background";

import { Home, WelcomeScreen } from "../features/home/pages";
import { Portfolio } from "../features/portfolio/pages";
import { Contact } from "../features/contact/pages";

import About from "../pages/About";

import LandingLayout from "../layouts/LandingLayout";

const SESSION_KEY = "portfolio_welcome_seen";

const LandingRoutes = () => {
    const [showWelcome, setShowWelcome] = useState(() => {
        return !sessionStorage.getItem(SESSION_KEY);
    });

    const handleWelcomeComplete = () => {
        sessionStorage.setItem(SESSION_KEY, "true");
        setShowWelcome(false);
    };

    return (
        <LandingLayout>
            <AnimatePresence mode="wait">
                {showWelcome && (
                    <WelcomeScreen
                        onLoadingComplete={handleWelcomeComplete}
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
