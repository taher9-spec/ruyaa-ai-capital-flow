import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FuturisticBackground from "@/components/FuturisticBackground";
import ParticleBackground from "@/components/ParticleBackground";
import ProfileCard from "@/components/dashboard/ProfileCard";
import FeatureCTA from "@/components/dashboard/FeatureCTA";
import SessionsCard from "@/components/dashboard/SessionsCard";
import WalletsCard from "@/components/dashboard/WalletsCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";

// Helper for framer motion cascade
const cardStagger = {
  animate: {
    transition: {
      staggerChildren: 0.11
    }
  }
};

const DashboardPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setSession(session);
      }
      setLoadingSession(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setSession(session);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: dashboardData, isLoading: isLoadingData } = useDashboardData(session);

  // --- CTA Actions ---
  const handleActivate = () => {
    // Scroll to agent flows or show modal (demo)
    toast({
      title: "Activate Features",
      description: "Feature activation flow coming soon (connect with agent)."
    });
  };

  const handleStartNow = () => {
    // Scroll/route to arbitrage setup
    toast({
      title: "Start Arbitrage",
      description: "Redirecting to arbitrage setup..."
    });
    navigate("/agents/arbitrage");
  };

  const handleWalletConnect = () => {
    // Call Solana wallet connect if available, otherwise toast
    const w = window as unknown as { solana?: { connect: () => void } };
    if (w.solana?.connect) {
      w.solana.connect();
    } else {
      toast({
        title: "Connect Wallet",
        description: "Wallet connect is only available with Solana extension."
      });
    }
  };

  if (loadingSession || isLoadingData || !session) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <span className="text-green-400 text-lg animate-pulse">Loading Dashboard...</span>
      </div>
    );
  }

  const featuresActive = dashboardData?.features && dashboardData.features.length > 0;

  return (
    <div className="relative min-h-screen font-spacegrotesk overflow-hidden">
      <FuturisticBackground />
      <ParticleBackground />
      <DashboardLayout>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full z-10"
          variants={cardStagger}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={{ animate: { opacity: 1, y: 0, transition: { delay: 0.07 } }, initial: { opacity: 0, y: 20 } }}>
            <ProfileCard profile={dashboardData?.profile} email={session.user.email} onEdit={() => toast({ title: "Edit Profile", description: "Coming soon!" })} />
          </motion.div>
          <motion.div variants={{ animate: { opacity: 1, y: 0, transition: { delay: 0.15 } }, initial: { opacity: 0, y: 20 } }}>
            {!featuresActive ? (
              <FeatureCTA onActivate={handleActivate} />
            ) : (
              // Show badges/feature list if you wish instead of CTA
              <FeatureCTA onActivate={handleActivate} />
            )}
          </motion.div>
          <motion.div variants={{ animate: { opacity: 1, y: 0, transition: { delay: 0.2 } }, initial: { opacity: 0, y: 20 } }}>
            <SessionsCard sessions={dashboardData?.sessions} onStartNow={handleStartNow} />
          </motion.div>
          <motion.div variants={{ animate: { opacity: 1, y: 0, transition: { delay: 0.28 } }, initial: { opacity: 0, y: 20 } }}>
            <WalletsCard wallets={dashboardData?.wallets} onAddWallet={handleWalletConnect} />
          </motion.div>
        </motion.div>
      </DashboardLayout>
      <Toaster />
    </div>
  );
};

export default DashboardPage;
