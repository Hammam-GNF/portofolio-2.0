import CardProject from "./CardProject";
import { getAOSAnimation } from "../../../utils/aos";


const ProjectGrid = ({
    displayedProjects,
}) => {

    return (
        <div className="container mx-auto flex justify-center items-center overflow-hidden">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">

                {
                    displayedProjects.map((project, index) => {

                        const animation = getAOSAnimation(index);


                        return (

                            <div
                                key={project.id || index}
                                data-aos={animation.animation}
                                data-aos-duration={animation.duration}
                            >

                                <CardProject
                                    Img={project.Img}
                                    Title={project.Title}
                                    Description={project.Description}
                                    Link={project.Link}
                                    id={project.id}
                                />

                            </div>

                        );

                    })
                }

            </div>

        </div>
    );
};


export default ProjectGrid;
