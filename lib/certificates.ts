import { supabase } from "./supabase";

export interface Certificate {
  id: string;
  user_id: string;

  title: string;
  organization: string;

  issue_date: string | null;

  credential_url: string | null;
  image_url: string | null;

  display_order: number;

  created_at: string;
  updated_at: string;
}

async function currentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCertificates() {
  const user = await currentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order", {
      ascending: true,
    });

  if (error) throw error;

  return data as Certificate[];
}

export async function getCertificate(id: string) {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Certificate;
}

export async function saveCertificate(
  certificate: Partial<Certificate>
) {
  const user = await currentUser();

  if (!user)
    throw new Error("User not found");

  const payload = {
    id: certificate.id,

    user_id: user.id,

    title: certificate.title,

    organization: certificate.organization,

    issue_date:
      certificate.issue_date || null,

    credential_url:
      certificate.credential_url || null,

    image_url:
      certificate.image_url || null,

    display_order:
      certificate.display_order ?? 0,
  };

  const { error } = await supabase
    .from("certificates")
    .upsert(payload);

  if (error) throw error;
}

export async function deleteCertificate(
  id: string
) {
  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) throw error;
}