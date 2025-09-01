import { useState, useCallback } from "react";
import { memberService } from "@/services/memberService";
import type { MemberData } from "@/types";

export const useMemberProfile = (
  token: string | null,
  isAdmin: boolean = false
) => {
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getMemberProfile = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const data = await memberService.getMemberProfile(token);
      setMemberData(data);
    } catch (error) {
      console.error("Failed to load member data:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const getSpecificMemberProfile = useCallback(
    async (memberId: string) => {
      if (!token) return;

      setLoading(true);
      try {
        const data = await memberService.getSpecificMemberProfile(
          token,
          memberId
        );
        setMemberData(data);
      } catch (error) {
        console.error("Failed to load member data:", error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateProfile = useCallback(
    async (profileData: any) => {
      if (!token) return;

      setSubmitting(true);
      try {
        await memberService.updateProfile(token, profileData);
        await getMemberProfile();
        alert("Profile updated successfully!");
        setIsEditing(false);
      } catch (error: any) {
        alert(error.message || "Failed to update profile. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [token, getMemberProfile]
  );

  const submitMemberRequest = useCallback(async () => {
    if (!token) return;

    setSubmitting(true);
    try {
      await memberService.submitMemberRequest(token);
      await getMemberProfile();
      alert("Member request submitted successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [token, getMemberProfile]);

  const approveMember = useCallback(
    async (memberId: string) => {
      if (!window.confirm("Are you sure you want to approve this member?"))
        return;
      if (!token) return;

      setSubmitting(true);
      try {
        await memberService.approveMember(token, memberId);
        alert("Member approved successfully!");
        await getSpecificMemberProfile(memberId);
      } catch (error: any) {
        alert(error.message || "Failed to approve member. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [token, getSpecificMemberProfile]
  );

  const rejectMember = useCallback(
    async (memberId: string) => {
      const reason = window.prompt("Please enter a reason for rejection:");
      if (!reason || reason.trim().length === 0) return;
      if (!token) return;

      setSubmitting(true);
      try {
        await memberService.rejectMember(token, memberId, reason.trim());
        alert("Member rejected successfully!");
        await getSpecificMemberProfile(memberId);
      } catch (error: any) {
        alert(error.message || "Failed to reject member. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [token, getSpecificMemberProfile]
  );

  return {
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
  };
};
