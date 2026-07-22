import { useEffect, useState } from "react";

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let index = 0;

        const timer = setInterval(() => {
            if (index <= text.length) {
                setDisplayText(text.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 260);

        return () => clearInterval(timer);
    }, [text]);

    return (
        <span className="inline-block">
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export default Typewriter;
