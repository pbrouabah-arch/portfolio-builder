import { supabase } from "./supabase";

async function currentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function uploadCertificateImage(file: File) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const extension = file.name.split(".").pop();

  const fileName =
    `${user.id}/${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("certificate-images")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("certificate-images")
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteCertificateImage(
  imageUrl: string
) {
  const bucket = "certificate-images";

  const index = imageUrl.indexOf(`${bucket}/`);

  if (index === -1) return;

  const path = imageUrl.substring(
    index + bucket.length + 1
  );

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) throw error;
}