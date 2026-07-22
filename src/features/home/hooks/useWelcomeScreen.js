import { useEffect, useState } from "react";
import AOS from "aos";

const useWelcomeScreen = (onLoadingComplete) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: false,
        });

        const timer = setTimeout(() => {
            setIsLoading(false);

            setTimeout(() => {
                onLoadingComplete?.();
            }, 1000);

        }, 4000);


        return () => clearTimeout(timer);

    }, [onLoadingComplete]);


    return {
        isLoading
    };
};

export default useWelcomeScreen;
