import { useCallback, useEffect, useState } from "react";

import {
    projectService,
    certificateService,
} from "../services";

import { getDisplayedItems } from "../utils";

import {
    PORTFOLIO_INITIAL_ITEMS
} from "../constants";



const usePortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const [showAllProjects, setShowAllProjects] = useState(false);
    const [showAllCertificates, setShowAllCertificates] = useState(false);

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 768
    );

    const initialItems = isMobile
        ? 4
        : PORTFOLIO_INITIAL_ITEMS;


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };


        window.matchMedia("(max-width:768px)")


        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );

    }, []);



    const fetchPortfolio = useCallback(async () => {
        try {

            const [
                projectData,
                certificateData
            ] = await Promise.all([
                projectService.getAll(),
                certificateService.getAll()
            ]);


            setProjects(projectData);
            setCertificates(certificateData);


        } catch (error) {

            console.error(
                "Failed loading portfolio data:",
                error
            );

        }

    }, []);



    useEffect(() => {

        setProjects(
            projectService.getCached()
        );

        setCertificates(
            certificateService.getCached()
        );


        fetchPortfolio();

    }, [fetchPortfolio]);




    const toggleShowMore = useCallback(
        (type) => {

            if(type === "projects") {

                setShowAllProjects(
                    previous => !previous
                );

                return;
            }


            setShowAllCertificates(
                previous => !previous
            );

        },
        []
    );



    const [activeTab, setActiveTab] = useState(0);



    useEffect(() => {

        const handleHashChange = () => {

            const hash = window.location.hash;


            if(hash.startsWith("#Portofolio-")) {

                const index = Number.parseInt(
                    hash.split("-")[1],
                    10
                );


                if (!Number.isNaN(index)) {
                    setActiveTab(index);
                }
            }

        };


        handleHashChange();


        window.addEventListener(
            "hashchange",
            handleHashChange
        );


        return () =>
            window.removeEventListener(
                "hashchange",
                handleHashChange
            );


    }, []);




    return {

        projects,
        certificates,

        activeTab,
        setActiveTab,

        showAllProjects,
        showAllCertificates,

        toggleShowMore,

        initialItems,

        displayedProjects: getDisplayedItems(
            projects,
            showAllProjects,
            initialItems
        ),

        displayedCertificates: getDisplayedItems(
            certificates,
            showAllCertificates,
            initialItems
        ),

    };

};


export default usePortfolio;
