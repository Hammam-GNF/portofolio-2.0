import { FOOTER_CONFIG } from "@/constants";


const Footer = () => {
    return (
        <footer>
            <center>
                <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />

                <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
                    © {FOOTER_CONFIG.YEAR}{" "}
                    <a
                        href={FOOTER_CONFIG.URL}
                        className="hover:underline"
                    >
                        {FOOTER_CONFIG.BRAND}
                    </a>
                    . {FOOTER_CONFIG.COPYRIGHT}
                </span>
            </center>
        </footer>
    );
};


export default Footer;
