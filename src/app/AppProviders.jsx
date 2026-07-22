import { useEffect } from "react";

import {
    initializeApp,
} from "../utils/app";


const AppProviders = ({ children }) => {

    useEffect(() => {
        initializeApp();
    }, []);


    return children;
};


export default AppProviders;
