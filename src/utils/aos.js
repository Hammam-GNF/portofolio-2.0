import { AOS_ANIMATIONS } from "../constants/aos.constant";

export function getAOSAnimation(index) {
    return AOS_ANIMATIONS[index % AOS_ANIMATIONS.length];
}
