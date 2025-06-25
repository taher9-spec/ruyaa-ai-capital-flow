
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, UserPlus } from "lucide-react";

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" className="mr-2" aria-hidden="true">
    <g>
      <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.77h5.5a4.7 4.7 0 0 1-2.06 3.09v2.57h3.33c1.96-1.81 3.09-4.5 3.09-7.43z"/>
      <path fill="#34A853" d="M10 20c2.7 0 4.97-.9 6.63-2.43l-3.33-2.57c-.92.62-2.08.98-3.3.98a5.73 5.73 0 0 1-5.41-3.96H1.14v2.59A10 10 0 0 0 10 20z"/>
      <path fill="#FBBC05" d="M4.59 12.02A5.47 5.47 0 0 1 4.1 10c0-.7.13-1.39.36-2.02V5.39H1.14A10 10 0 0 0 0 10a9.98 9.98 0 0 0 1.14 4.61l3.45-2.59z"/>
      <path fill="#EA4335" d="M10 4.06c1.48 0 2.8.5 3.85 1.48l2.88-2.88A9.98 9.98 0 0 0 10 0C6.1 0 2.75 2.27 1.14 5.39l3.45 2.59A5.73 5.73 0 0 1 10 4.06z"/>
    </g>
  </svg>
);

type AuthType = "signIn" | "signUp";

interface EmailAuthFormProps {
  activeTab: AuthType;
  setActiveTab: (type: AuthType) => void;
}

const EmailAuthForm: React.FC<EmailAuthFormProps> = ({ activeTab, setActiveTab }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    if (!email || !password) {
      setErr("Please enter email and password.");
      setLoading(false);
      return;
    }
    try {
      if (activeTab === "signIn") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setErr(error.message);
      } else {
        const redirectTo = `${window.location.origin}/dashboard`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo,
            data: {
              full_name: fullName,
              info,
              avatar_url: "/Ruyaa-Agent.png"
            }
          }
        });
        if (error) setErr(error.message);
      }
    } catch (err: unknown) {
      const e = err as { message?: string } | undefined;
      setErr(e?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setErr(null);
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
    } catch (err: unknown) {
      const e = err as { message?: string } | undefined;
      setErr(e?.message || "OAuth failed");
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full py-3 rounded-full bg-[#202124] flex items-center justify-center gap-2 text-white text-base hover:bg-[#2a2d2f] font-medium mb-2 transition"
        disabled={loading}
      >
        {GOOGLE_ICON} Continue with Google
      </button>
      <div className="relative flex items-center my-2">
        <div className="flex-grow border-t border-neutral-700" />
        <span className="mx-2 text-xs text-neutral-500">or</span>
        <div className="flex-grow border-t border-neutral-700" />
      </div>
      {activeTab === "signUp" && (
        <Input
          className="bg-[#111111] border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 text-base"
          placeholder="Full Name"
          type="text"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          disabled={loading}
        />
      )}
      <Input
        className="bg-[#111111] border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 text-base"
        placeholder="Email"
        autoComplete="username"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
      />
      {activeTab === "signUp" && (
        <Input
          className="bg-[#111111] border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 text-base"
          placeholder="Info"
          type="text"
          value={info}
          onChange={e => setInfo(e.target.value)}
          disabled={loading}
        />
      )}
      <Input
        className="bg-[#111111] border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 text-base"
        placeholder="Password"
        autoComplete={activeTab === "signUp" ? "new-password" : "current-password"}
        type="password"
        minLength={6}
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
      />
      {err && <div className="text-red-400 text-sm">{err}</div>}
      <Button
        type="submit"
        className="w-full py-3 mt-2 rounded-full bg-green-500 text-white font-semibold text-lg hover:shadow-[0_0_12px_rgba(0,255,157,0.5)] transition flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (activeTab === "signIn" ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />)}
        {activeTab === "signIn" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};

export default EmailAuthForm;
