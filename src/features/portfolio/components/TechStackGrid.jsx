import TechStackIcon from "@/components/ui/TechStackIcon";
import { TECH_STACKS } from "@/constants";

import { getAOSAnimation } from "@/utils";


const TechStackGrid = () => {


    return (

        <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">


                {
                    TECH_STACKS.map((stack,index)=>{

                        const animation = getAOSAnimation(index);


                        return (

                            <div
                                key={stack.language || index}
                                data-aos={animation.animation}
                                data-aos-duration={animation.duration}
                            >

                                <TechStackIcon
                                    TechStackIcon={stack.icon}
                                    Language={stack.language}
                                />

                            </div>

                        );

                    })
                }


            </div>

        </div>

    );

};


export default TechStackGrid;
