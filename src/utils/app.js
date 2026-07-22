import AOS from "aos";
import "aos/dist/aos.css";

import {
    AOS_CONFIG,
} from "../constants/aos.constant";


export const initializeApp = () => {
    initializeAOS();
};


const initializeAOS = () => {
    AOS.init(AOS_CONFIG);
};
