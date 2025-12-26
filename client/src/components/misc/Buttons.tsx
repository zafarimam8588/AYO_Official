import { Heart, Users } from "lucide-react";
import { RainbowButton } from "../magicui/rainbow-button";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { UserAvatar } from "../ui/UserAvatar";

interface DonateButtonProps {
  classStyle: string;
  onClick: () => void;
}

interface VolunteerBtnProps extends DonateButtonProps {
  isLoggedIn: boolean;
  userName?: string;
  profilePic?: string;
}

export const VolunteerBtn = ({
  classStyle,
  onClick,
  isLoggedIn,
  userName,
  profilePic,
}: VolunteerBtnProps) => {
  return (
    <RainbowButton variant="outline" className={classStyle} onClick={onClick}>
      {isLoggedIn ? (
        <>
          <UserAvatar
            profilePic={profilePic}
            userName={userName}
            size="sm"
            className="mr-1"
          />
          {userName || "Profile"}
        </>
      ) : (
        <>
          <Users className="h-3 w-3 mr-1" />
          Become a Member
        </>
      )}
    </RainbowButton>
  );
};

export const DonateBtn = ({ classStyle, onClick }: DonateButtonProps) => {
  return (
    <RainbowButton className={classStyle} onClick={onClick}>
      <Heart className="h-3 w-3 mr-1" />
      Donate
    </RainbowButton>
  );
};
export const SupportOurMissionBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/donate")}
      size="lg"
      className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-6 py-3 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <Heart className="h-4 w-4 mr-2" />
      Support Our Mission
    </Button>
  );
};

export const VolunteerNowBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/login")}
      size="lg"
      variant="outline"
      className="border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-3 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 cursor-pointer"
    >
      <Users className="h-4 w-4 mr-2" />
      Become a Volunteer
    </Button>
  );
};
