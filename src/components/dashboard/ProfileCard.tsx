
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { type Tables } from "@/integrations/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditProfileModal from "./EditProfileModal";

interface ProfileCardProps {
  profile: Tables<"profiles"> | null | undefined;
  email: string | undefined;
  onEdit?: () => void;
}

const getInitials = (name: string | null | undefined) =>
  !name
    ? "U"
    : name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, email }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 16 }}
      className="relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-green-400 outline-none"
      tabIndex={0}
      aria-label="Profile information"
    >
      <div className="absolute inset-0 bg-black/40 blur-xl -z-10" aria-hidden />
      <div className="absolute top-4 left-4 text-green-400">
        <User strokeWidth={2.2} className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-5 mt-2 mb-6">
        <div className="flex-shrink-0">
          <Avatar className="h-16 w-16 ring-2 ring-green-400">
            <AvatarImage src="/Ruyaa-Agent.png" alt="Ruyaa Agent" />
            <AvatarFallback className="bg-gray-800 text-white font-bold">{getInitials(profile?.full_name)}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="text-xl font-bold text-white">{profile?.full_name || "No Name"}</div>
          <div className="text-sm text-green-200">{email}</div>
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => setModalOpen(true)}
        className="px-6 py-2 rounded-full border border-green-400 text-green-300 hover:bg-green-600/20 hover:text-white focus-visible:ring-2 focus-visible:ring-green-400 transition-all font-semibold text-base"
        tabIndex={0}
      >
        Edit Profile
      </Button>
      <EditProfileModal open={modalOpen} onOpenChange={setModalOpen} profile={profile} email={email} />
    </motion.div>
  );
};
export default ProfileCard;
