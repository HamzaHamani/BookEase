import supabase, { supabaseUrl } from "./SupaBase";
import { v4 as uuid } from "uuid";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //options to pass more data about the user
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); //we check for an active session

  if (!session.session) return null; //if there is no active session, we return null

  const { data, error } = await supabase.auth.getUser(); // we get the user data
  if (error) console.error(error);

  return data?.user;
}
// console.log(supabase);

export async function logoutApi() {
  // console.log("logout");
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1 Update password or fullName,(we cant update both same at the time cuz each one in diffrent form)
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  //2. Update avatar

  if (!avatar) return data;
  const fileName = `avatar-${data?.user?.id}-${uuid()}`;
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar); //.upload(name of the img, file of the image)
  if (storageError) throw new Error(storageError.message);

  //3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: imageUrl },
  });
  if (error2) throw new Error(error2.message);

  return updatedUser;
}
