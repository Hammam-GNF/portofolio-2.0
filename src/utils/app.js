import AOS from "aos";
import "aos/dist/aos.css";

import {
    AOS_CONFIG,
} from "../constants";


export const initializeApp = () => {
    AOS.init(AOS_CONFIG);
};
