import { supabase } from "./supabase";

export async function uploadProjectImage(file: File) {
  const fileExt = file.name.split(".").pop();

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const filePath = `projects/${fileName}`;

  const { error } = await supabase.storage
    .from("portfolio")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("portfolio")
    .getPublicUrl(filePath);

  return data.publicUrl;
}