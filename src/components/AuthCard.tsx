import React, { useEffect, useState } from "react"; 
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import EmailAuthForm from "./auth/EmailAuthForm";
import WalletConnectButton from "./auth/WalletConnectButton";
import RuyaaCharacterCard from "./RuyaaCharacterCard";

type AuthType = "signIn" | "signUp";

const AuthCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AuthType>("signIn");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) navigate("/dashboard");
    });
    return () => { subscription.unsubscribe(); };
  }, [navigate]);

  return (
    <>
      {/* Modal overlay for AuthCard, always below modal but above Navbar */}
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full font-spacegrotesk">
        <div className="w-full max-w-md mx-auto bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mt-24 sm:mt-32 mb-8 relative z-10 animate-fade-in"
          style={{minHeight: 'auto', marginTop: '6rem'}}>
          <RuyaaCharacterCard
            onClick={() => setActiveTab('signUp')}
            className="mb-6"
          />
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <button
              className={`px-5 py-1 font-semibold text-white transition border-b-2 ${activeTab === "signIn"
                  ? "border-green-400 text-neon-green"
                  : "border-transparent text-neutral-400 hover:text-green-400"
                }`}
              onClick={() => setActiveTab("signIn")}
              tabIndex={0}
            >Sign In</button>
            <button
              className={`px-5 py-1 font-semibold text-white transition border-b-2 ${activeTab === "signUp"
                  ? "border-green-400 text-neon-green"
                  : "border-transparent text-neutral-400 hover:text-green-400"
                }`}
              onClick={() => setActiveTab("signUp")}
              tabIndex={0}
            >Sign Up</button>
          </div>

          {/* Email/Password or Google Auth */}
          <EmailAuthForm activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Or connect wallet */}
          <div className="relative flex pt-8 pb-4 items-center">
            <div className="flex-grow border-t border-neutral-700"></div>
            <span className="mx-4 text-neutral-500 text-xs uppercase tracking-widest">OR CONNECT WALLET</span>
            <div className="flex-grow border-t border-neutral-700"></div>
          </div>
          <WalletConnectButton />
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default AuthCard;
