import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../libs/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuth() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error("Auth callback error", error);
        return navigate("/signup?error=verification_failed");
      }

      const user = session.user;

      // profiles 테이블에 프로필이 없으면 INSERT
      const { data: existing, error: selectError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();
      if (selectError) {
        console.error("profiles select error", selectError);
      } else if (!existing) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          nickname: user.email!,
        });
        if (insertError) {
          console.error("profiles insert error", insertError);
        }
      }

      navigate("/");
    }

    handleAuth();
  }, [navigate]);

  return <p>인증 처리 중입니다… 잠시만 기다려주세요.</p>;
}
