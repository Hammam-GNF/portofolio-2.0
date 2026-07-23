import { supabase } from "@/supabase";
import { storageService } from "@/services";
import { STORAGE_KEYS } from "@/constants";

const CACHE_KEY = STORAGE_KEYS.PROJECTS;

class ProjectService {
  async getAll() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    storageService.set(CACHE_KEY, data);

    return data;
  }

  async refresh() {
    return this.getAll();
  }

  getCached() {
    return storageService.get(CACHE_KEY, []);
  }

  getById(id) {
    const projects = this.getCached();

    const project = projects.find(
      (item) => String(item.id) === String(id)
    );

    if (!project) {
      return null;
    }

    return {
      ...project,
      Features: project.Features || [],
      TechStack: project.TechStack || [],
      Github: project.Github || "https://github.com/Hammam-GNF",
    };
  }
}

export default new ProjectService();
