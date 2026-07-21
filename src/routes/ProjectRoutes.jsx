import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/Background";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Portofolio from "../Pages/Portofolio";
import ContactPage from "../Pages/Contact";
import WelcomeScreen from "../Pages/WelcomeScreen";

const LandingRoutes = () => {
    const [showWelcome, setShowWelcome] = useState(true);

    return (
        <>
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

                    <footer>
                        <center>
                            <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />

                            <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
                                © 2026{" "}
                                <a
                                    href="www.hammam.my.id"
                                    className="hover:underline"
                                >
                                    HammamGNF™
                                </a>
                                . All Rights Reserved.
                            </span>
                        </center>
                    </footer>
                </>
            )}
        </>
    );
};

export default LandingRoutes;
