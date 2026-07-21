const LandingLayout = ({ children }) => {
    return (
        <>
            {children}

            <footer>
                <center>
                    <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />

                    <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
                        © 2026{" "}
                        <a
                            href="www.hammam.my.id"
                            className="hover:underline"
                        >
                            HammamGNF™
                        </a>
                        . All Rights Reserved.
                    </span>
                </center>
            </footer>
        </>
    );
};

export default LandingLayout;
