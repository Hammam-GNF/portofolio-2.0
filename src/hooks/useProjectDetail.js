import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import projectService from "../services/project.service";

import {
  Globe,
  Layout,
  Cpu,
  Code,
  Package,
} from "lucide-react";

export const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const useProjectDetail = (id) => {
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const selectedProject = projectService.getById(id);

    if (selectedProject) {
      setProject(selectedProject);
    }
  }, [id]);

  const handleGithubClick = useCallback((githubLink) => {
    if (githubLink === "Private") {
      Swal.fire({
        icon: "info",
        title: "Source Code Private",
        text: "Maaf, source code untuk proyek ini bersifat privat.",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#3085d6",
        background: "#030014",
        color: "#ffffff",
      });

      return false;
    }

    return true;
  }, []);

  return {
    project,
    isImageLoaded,
    setIsImageLoaded,
    handleGithubClick,
    TECH_ICONS,
  };
};

export default useProjectDetail;
