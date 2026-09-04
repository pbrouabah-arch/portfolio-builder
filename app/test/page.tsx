import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("templates")
    .select("*");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Supabase Test
      </h1>

      {error ? (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}