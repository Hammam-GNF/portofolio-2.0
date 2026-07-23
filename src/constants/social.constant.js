import {
    Linkedin,
    Github,
    AtSign,
} from "lucide-react";

export const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        displayName: "Let's Connect",
        subText: "on LinkedIn",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/hammamghinanurfauzi/",
        color: "#0A66C2",
        gradient: "from-[#0A66C2] to-[#0077B5]",
        isPrimary: true,
    },
    {
        name: "Instagram",
        displayName: "Instagram",
        subText: "@hageenef",
        icon: AtSign,
        url: "https://www.instagram.com/hageenef",
        color: "#E4405F",
        gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
    },
    {
        name: "GitHub",
        displayName: "GitHub",
        subText: "@Hammam-GNF",
        icon: Github,
        url: "https://github.com/Hammam-GNF",
        color: "#ffffff",
        gradient: "from-[#333] to-[#24292e]",
    },
];
