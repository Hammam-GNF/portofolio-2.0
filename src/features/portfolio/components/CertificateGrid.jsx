import Certificate from "./Certificate";
import { getAOSAnimation } from "@/utils";


const CertificateGrid = ({
    displayedCertificates,
}) => {


    return (

        <div className="container mx-auto flex justify-center items-center overflow-hidden">

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">

                {
                    displayedCertificates.map((certificate,index)=>{

                        const animation = getAOSAnimation(index);


                        return (

                            <div
                                key={certificate.id || index}
                                data-aos={animation.animation}
                                data-aos-duration={animation.duration}
                            >

                                <Certificate
                                    ImgSertif={certificate.Img}
                                />

                            </div>

                        );

                    })
                }

            </div>

        </div>

    );

};


export default CertificateGrid;
