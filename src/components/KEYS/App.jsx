import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publicKey = import.meta.env.VITE_SUPABASE_KEY;

const SupabaseClient = createClient(
    url, publicKey
);

export default SupabaseClient;
