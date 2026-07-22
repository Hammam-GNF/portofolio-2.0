import {
    Music2,
    Code2,
    Gamepad2,
    Headphones,
} from "lucide-react";

export const getPresenceIcon = (
    iconType,
    className = "w-5 h-5"
) => {

    const icons = {
        spotify: <Music2 className={className} />,
        vscode: <Code2 className={className} />,
        gaming: <Gamepad2 className={className} />,
        default: <Headphones className={className} />,
    };

    return icons[iconType] || icons.default;
};



export const getPresenceColors = (type) => {

    const colors = {

        spotify: {
            bg: "from-green-500/15 to-emerald-500/10",
            border: "border-green-500/30",
            text: "text-green-400",
            badge: "bg-green-500/20 border-green-400/40",
            glow: "shadow-green-500/20",
        },

        coding: {
            bg: "from-blue-500/15 to-indigo-500/10",
            border: "border-blue-500/30",
            text: "text-blue-400",
            badge: "bg-blue-500/20 border-blue-400/40",
            glow: "shadow-blue-500/20",
        },

        gaming: {
            bg: "from-red-500/15 to-pink-500/10",
            border: "border-red-500/30",
            text: "text-red-400",
            badge: "bg-red-500/20 border-red-400/40",
            glow: "shadow-red-500/20",
        },

        default: {
            bg: "from-purple-500/15 to-violet-500/10",
            border: "border-purple-500/30",
            text: "text-purple-400",
            badge: "bg-purple-500/20 border-purple-400/40",
            glow: "shadow-purple-500/20",
        },
    };

    return colors[type] || colors.default;
};



export const getPresenceLabel = (type) => {

    const labels = {
        spotify: "NOW PLAYING",
        coding: "CODING",
        gaming: "PLAYING",
        default: "ACTIVE",
    };

    return labels[type] || labels.default;
};
