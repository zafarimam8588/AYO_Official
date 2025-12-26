import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useMemberProfile } from "@/hooks/useMemberProfile";
import { checkProfileCompletion } from "@/utils/memberUtil";
import { memberService } from "@/services/memberService";

import { SharedMemberHeader } from "@/components/member/SharedMemberHeader";
import { StatusBanner } from "@/components/member/StatusBanner";
import { ProfileInformation } from "@/components/member/ProfileInformation";
import { EditProfileForm } from "@/components/member/EditProfileForm";
import { AdminActionPanel } from "@/components/member/AdminActionPannel";
import { UserActionPanel } from "@/components/member/UserActionPannel";
import { MembershipDetails } from "@/components/member/MembershipDetail";
import { LoadingSpinner } from "@/components/member/LoadingSpinner";

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

  if (!isAuthenticated) return null;
  if (loading) return <LoadingSpinner />;
  if (!memberData)
    return <p className="p-8 text-center">Unable to load data.....</p>;

  const { profile, user } = memberData;
  const isProfileComplete = checkProfileCompletion(profile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <SharedMemberHeader
            isAdmin={isAdmin}
            currentUser={currentUser!}
            onLogout={handleLogout}
            onBackClick={handleBackClick}
          />

          <StatusBanner profile={profile} isAdmin={isAdmin} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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

            <div className="lg:col-span-1">
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

          {profile.memberStatus !== "not_submitted" && (
            <MembershipDetails profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedMemberProfile;
