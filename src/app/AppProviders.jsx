import { useEffect } from "react";

import {
    initializeApp,
} from "../utils";


const AppProviders = ({ children }) => {

    useEffect(() => {
        initializeApp();
    }, []);


    return children;
};


export default AppProviders;
