import React from "react";
import ParticleBackground from "@/components/ParticleBackground";
import ProfileSection from "@/components/dashboard/ProfileSection";
import { useAuthState } from "@/hooks/chat/useAuthState";
import type { Tables } from "@/integrations/supabase/types";

const ProfilePage: React.FC = () => {
  const { session, userProfile } = useAuthState();
  const profileData = userProfile as Tables<'profiles'> | null;

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0D0D0D]">
      <ParticleBackground />
      <main className="pt-32 pb-20 w-full max-w-4xl mx-auto px-6">
        <ProfileSection profile={profileData} email={session.user.email} />
      </main>
    </div>
  );
};

export default ProfilePage;
