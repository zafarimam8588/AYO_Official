import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { checkProfileCompletion } from "@/utils/memberUtil";
import { memberService } from "@/services/memberService";

import { SharedMemberHeader } from "@/components/member/SharedMemberHeader";
import { StatusBanner } from "@/components/member/StatusBanner";
import { DashboardSummaryCards } from "@/components/member/DashboardSummaryCards";
import { ProfileInformation } from "@/components/member/ProfileInformation";
import { EditProfileForm } from "@/components/member/EditProfileForm";
import { AdminActionPanel } from "@/components/member/AdminActionPannel";
import { UserActionPanel } from "@/components/member/UserActionPannel";
import { MembershipDetails } from "@/components/member/MembershipDetail";
import { MemberProfileSkeleton } from "@/components/skeletons";

interface SharedMemberDashboardProps {
  isAdmin?: boolean;
}

const SharedMemberProfile: React.FC<SharedMemberDashboardProps> = ({
  isAdmin = false,
}) => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const { token, currentUser, isAuthenticated } = useAuth();

  const {
    memberData,
    loading,
    submitting,
    isEditing,
    setIsEditing,
    getMemberProfile,
    getSpecificMemberProfile,
    updateProfile,
    submitMemberRequest,
    approveMember,
    rejectMember,
  } = useMemberProfile(token, isAdmin);

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin && memberId) {
        getSpecificMemberProfile(memberId);
      } else {
        getMemberProfile();
      }
    }
  }, [
    isAuthenticated,
    isAdmin,
    memberId,
    getMemberProfile,
    getSpecificMemberProfile,
  ]);

  const handleLogout = async () => {
    try {
      if (token) {
        await memberService.logout(token);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleApproveMember = (message?: string) => {
    if (memberId) {
      approveMember(memberId, message);
    }
  };

  const handleRejectMember = (reason: string) => {
    if (memberId) {
      rejectMember(memberId, reason);
    }
  };

  if (!isAuthenticated) {
    return null;
  }
  if (loading) {
    return <MemberProfileSkeleton isAdmin={isAdmin} />;
  }
  if (!memberData) {
    return <p className="p-8 text-center">Unable to load data.....</p>;
  }

  const { profile, user } = memberData;
  const isProfileComplete = checkProfileCompletion(profile);
  const profileCompletionPercentage = isProfileComplete ? 100 : 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30 relative">
      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ff993306_1px,transparent_1px),linear-gradient(to_bottom,#13880806_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <SharedMemberHeader
            isAdmin={isAdmin}
            currentUser={currentUser!}
            onLogout={handleLogout}
            onBackClick={handleBackClick}
          />

          {/* Status Banner */}
          <StatusBanner profile={profile} isAdmin={isAdmin} />

          {/* Summary Cards - Only show for non-admin members */}
          {!isAdmin && (
            <DashboardSummaryCards
              profile={profile}
              user={user}
              profileCompletionPercentage={profileCompletionPercentage}
            />
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Profile Information - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {isEditing && !isAdmin ? (
                <EditProfileForm
                  user={user}
                  profile={profile}
                  onSave={updateProfile}
                  onCancel={() => setIsEditing(false)}
                  submitting={submitting}
                />
              ) : (
                <ProfileInformation
                  user={user}
                  profile={profile}
                  isProfileComplete={isProfileComplete}
                  onEditProfile={() => setIsEditing(true)}
                  isAdmin={isAdmin}
                />
              )}
            </div>

            {/* Action Panel - Takes 1/3 on desktop */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              {isAdmin ? (
                <AdminActionPanel
                  profile={profile}
                  onApprove={handleApproveMember}
                  onReject={handleRejectMember}
                  submitting={submitting}
                  memberName={user?.fullName}
                />
              ) : (
                <UserActionPanel
                  profile={profile}
                  isProfileComplete={isProfileComplete}
                  onSubmitRequest={submitMemberRequest}
                  submitting={submitting}
                />
              )}
            </div>
          </div>

          {/* Membership Details - Only show if application submitted */}
          {profile.memberStatus !== "not_submitted" && (
            <MembershipDetails profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedMemberProfile;
