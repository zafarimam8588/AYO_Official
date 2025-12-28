import { Heart, Users } from "lucide-react";
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
    <Button
      variant="greenOutline"
      className={`font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg border-2 bg-white/90 cursor-pointer ${classStyle}`}
      onClick={onClick}
    >
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
          <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
          <span className="truncate">Become a Member</span>
        </>
      )}
    </Button>
  );
};

export const DonateBtn = ({ classStyle, onClick }: DonateButtonProps) => {
  return (
    <Button
      variant="tricolor"
      className={`h-12 px-8 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-saffron-200/50 cursor-pointer ${classStyle}`}
      onClick={onClick}
    >
      <Heart className="h-5 w-5 mr-2" />
      Donate
    </Button>
  );
};
export const SupportOurMissionBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/donate")}
      size="lg"
      variant="tricolor"
      className="h-12 px-8 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-saffron-200/50 cursor-pointer"
    >
      <Heart className="h-5 w-5 mr-2" />
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
      variant="greenOutline"
      className="h-12 px-8 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 bg-white/90 cursor-pointer"
    >
      <Users className="h-5 w-5 mr-2" />
      Become a Volunteer
    </Button>
  );
};
