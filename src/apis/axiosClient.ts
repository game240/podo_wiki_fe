import axios from "axios";
import { supabase } from "../libs/supabaseClient";

const session = await supabase.auth.getSession();
const token = session?.data.session?.access_token;

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosClient;
