import { supabase } from "../../../supabase";
import storageService from "../../../services/storage.service";

const CACHE_KEY = "certificates";

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
