import { supabase } from "../../../supabase";

class CommentService {
  async getPinnedComment() {
    const { data, error } = await supabase
      .from("portfolio_comments")
      .select("*")
      .eq("is_pinned", true)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data;
  }


  async getComments() {
    const { data, error } = await supabase
      .from("portfolio_comments")
      .select("*")
      .eq("is_pinned", false)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data || [];
  }


  subscribe(callback) {
    const channel = supabase
      .channel("portfolio_comments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "portfolio_comments",
          filter: "is_pinned=eq.false",
        },
        callback
      )
      .subscribe();

    return channel;
  }


  async uploadImage(imageFile) {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();

    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;


    const filePath = `profile-images/${fileName}`;


    const { error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, imageFile);


    if (error) {
      throw error;
    }


    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);


    return data.publicUrl;
  }



  async createComment({
    content,
    userName,
    profileImage,
  }) {

    const { error } = await supabase
      .from("portfolio_comments")
      .insert([
        {
          content,
          user_name: userName,
          profile_image: profileImage,
          is_pinned:false,
          created_at:new Date().toISOString()
        }
      ]);


    if(error){
      throw error;
    }

    return true;
  }
}


export default new CommentService();
