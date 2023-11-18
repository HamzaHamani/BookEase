import { toast } from "sonner";
import supabase, { supabaseUrl } from "./SupaBase";
import { v4 as uuid } from "uuid";
// import { useQueryClient } from "@tanstack/react-query";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

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

  const { error: deleteError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.image.split("/").pop()]);
  if (deleteError) {
    toast.error("We couldnt delete the image from the database");
  }
  return data;
}

export async function createCabin(newCabin) {
  //#TODO there is an error with code below of imageName return undefined
  // console.log(newCabin);

  const imageName = `${uuid()}-${newCabin?.image?.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

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
