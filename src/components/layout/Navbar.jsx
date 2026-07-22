import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import { NAV_ITEMS, COLORS, GRADIENTS } from "@/constants";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(NAVBAR_CONFIG.SCROLL_THRESHOLD);
            const sections = NAV_ITEMS.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    const getBackgroundColor = () => {
        if (isOpen) return COLORS.BACKGROUND;
        if (scrolled) return "rgba(3,0,20,.5)";
        return "transparent";
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-[500ms] ${
                scrolled
                    ? "backdrop-blur-xl"
                    : ""
            }`}
            style={{
                backgroundColor: getBackgroundColor(),
            }}
        >
            <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className={`text-xl font-bold bg-gradient-to-r ${GRADIENTS.PRIMARY} bg-clip-text text-transparent`}
                        >
                            Hammam GNF
                        </a>
                    </div>
        
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {NAV_ITEMS.map((item) => {
                                const isActive = activeSection === item.href.substring(1);

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className="group relative px-1 py-2 text-sm font-medium"
                                    >
                                        <span
                                            className={`relative z-10 transition-colors duration-300 ${
                                                isActive
                                                    ? `bg-gradient-to-r ${GRADIENTS.PRIMARY} bg-clip-text text-transparent font-semibold`
                                                    : "text-[#e2d3fd] group-hover:text-white"
                                            }`}
                                        >
                                            {item.label}
                                        </span>

                                        <span
                                            className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${GRADIENTS.PRIMARY} transform origin-left transition-transform duration-300 ${
                                                isActive
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
        
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        
            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <div className="px-4 py-6 space-y-4">
                    {NAV_ITEMS.map((item, index) => {
                        const isActive = activeSection === item.href.substring(1);

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="block px-4 py-3 text-lg font-medium transition-all duration-300 ease"
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                    opacity: isOpen ? 1 : 0,
                                }}
                            >
                                <span
                                    className={`inline-block ${
                                        isActive
                                            ? `bg-gradient-to-r ${GRADIENTS.PRIMARY} bg-clip-text text-transparent font-semibold`
                                            : "text-[#e2d3fd] hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
