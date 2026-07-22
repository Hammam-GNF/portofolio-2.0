import Footer from "../components/layout/Footer";


const LandingLayout = ({ children }) => {
    return (
        <>
            {children}

            <Footer />
        </>
    );
};


export default LandingLayout;
