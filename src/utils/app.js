import AOS from "aos";
import "aos/dist/aos.css";

import {
    AOS_CONFIG,
} from "../constants";


const initializeAOS = () => {
    AOS.init(AOS_CONFIG);
};


export const initializeApp = () => {
    initializeAOS();
};
