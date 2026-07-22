import AOS from "aos";
import "aos/dist/aos.css";

import {
    AOS_CONFIG,
} from "../constants/aos.constant";


const initializeAOS = () => {
    AOS.init(AOS_CONFIG);
};


export const initializeApp = () => {
    initializeAOS();
};
