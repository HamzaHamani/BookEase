import supabase from "./SupaBase";
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
