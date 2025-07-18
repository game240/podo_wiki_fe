import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../libs/supabaseClient";

type Profile = User & {
  nickname: string;
};

interface AuthContextType {
  user: Profile | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      return;
    }
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("id", session.user.id)
      .maybeSingle();
    if (error) {
      console.error("profile load error", error);
      setUser({ ...session.user, nickname: "" });
    } else {
      setUser({ ...session.user, nickname: profile?.nickname ?? "" });
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      loadUserProfile(data.session).finally(() => setLoading(false));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      loadUserProfile(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
