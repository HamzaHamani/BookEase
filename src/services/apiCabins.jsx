import supabase from "./SupaBase";
// import { useQueryClient } from "@tanstack/react-query";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("We couldnt get the cabins from the database");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("We couldnt delete the cabin from the database");
  }
}

export async function createCabin(newCabin) {
  console.log(newCabin);
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    throw new Error("We couldnt create the cabin in the database");
  }
  return data;
}
