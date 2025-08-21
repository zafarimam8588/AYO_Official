import { Heart, Users } from "lucide-react";
import { RainbowButton } from "../magicui/rainbow-button";

export const VolunteerBtn = ({ classStyle }: { classStyle: string }) => {
  return (
    <RainbowButton variant="outline" className={classStyle}>
      <Users className="h-3 w-3 mr-1" />
      Become a Member
    </RainbowButton>
  );
};

export const DonateBtn = ({ classStyle }: { classStyle: string }) => {
  return (
    <RainbowButton className={classStyle}>
      <Heart className="h-3 w-3 mr-1" />
      Donate
    </RainbowButton>
  );
};
