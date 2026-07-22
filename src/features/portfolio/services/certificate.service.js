import { supabase } from "@/supabase";
import { storageService } from "@/services";
import { STORAGE_KEYS } from "@/constants";

const CACHE_KEY = STORAGE_KEYS.CERTIFICATES;

class CertificateService {
  async getAll(forceRefresh = false) {
    if (!forceRefresh) {
      const cached = storageService.get(CACHE_KEY, []);

      if (cached.length) {
        return cached;
      }
    }

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    storageService.set(CACHE_KEY, data);

    return data;
  }

  async refresh() {
    return this.getAll(true);
  }

  getCached() {
    return storageService.get(CACHE_KEY, []);
  }
}

export default new CertificateService();
