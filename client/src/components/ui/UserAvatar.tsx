import React, { useState } from "react";
import { User } from "lucide-react";

interface UserAvatarProps {
  profilePic?: string;
  userName?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  profilePic,
  userName,
  size = "md",
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const baseClasses = `${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center ${className}`;

  // Show fallback icon if no profile pic or image failed to load
  if (!profilePic || imageError) {
    return (
      <div
        className={`${baseClasses} bg-gradient-to-br from-blue-100 to-indigo-100`}
      >
        <User className={`${iconSizes[size]} text-blue-600`} />
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      <img
        src={profilePic}
        alt={userName ? `${userName}'s profile` : "User profile"}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
};
