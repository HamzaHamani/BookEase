import supabase from "./SupaBase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("We couldnt get the cabins from the database");
  }
  return data;
}
