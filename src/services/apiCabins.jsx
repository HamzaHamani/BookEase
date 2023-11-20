import { toast } from "sonner";
import supabase, { supabaseUrl } from "./SupaBase";
import { v4 as uuid } from "uuid";
// import { useQueryClient } from "@tanstack/react-query";

export async function getCabins() {
  let { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("We couldnt get the cabins from the database");
  }
  return data;
}

export async function deleteCabin(cabin) {
  // console.log(cabin);
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabin.id);
  if (error) {
    throw new Error("We couldnt delete the cabin from the database");
  }

  //delete the image , i did it without jonas isntruction
  console.log(cabin.image);
  console.log(cabin.image.split("/").pop());
  const { error: deleteError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.image.split("/").pop()]);
  if (deleteError) {
    toast.error("We couldnt delete the image from the database");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${uuid()}-${newCabin?.image?.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //to create cabin
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //to edit ccabin
  if (id) query = query?.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("We couldnt create the cabin in the database");
  }
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    const { error } = await supabase.from("cabins").delete().eq("id", data.id);
    error;
  }
  return data;
}

// export async function createCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
//   console.log(newCabin);
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([newCabin])
//     .select();

//   if (error) {
//     throw new Error("We couldnt create the cabin in the database");
//   }
//   return data;

// const avatarFile = event.target.files[0];
// const { data, error } = await supabase.storage
//   .from("avatars")
//   .upload("public/avatar1.png", avatarFile, {
//     cacheControl: "3600",
//     upsert: false,
// });
// }
