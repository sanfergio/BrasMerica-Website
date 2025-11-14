import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publicKey = import.meta.env.VITE_SUPABASE_KEY;

const SupabaseClient = createClient(
    url, publicKey
);

const VindiToken = import.meta.env.VITE_PHP_VINDI_ACESSTOKEN_PAYMENT;

export { VindiToken };

export default SupabaseClient;
