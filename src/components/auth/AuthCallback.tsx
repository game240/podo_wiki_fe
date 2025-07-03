import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../libs/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ error }) => {
      if (error) {
        console.error("Auth callback error", error.message);
        navigate("/signup?error=verification_failed");
      } else {
        navigate("/viewer");
      }
    });
  }, [navigate]);

  return <p>인증 처리 중입니다… 잠시만 기다려주세요.</p>;
}
