import { useState, useCallback } from "react";
import { memberService } from "@/services/memberService";
import type { MemberData, ProfileUpdateData } from "@/types";
import toast from "react-hot-toast";

export const useMemberProfile = (
  token: string | null,
  _isAdmin: boolean = false
) => {
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getMemberProfile = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      const data = await memberService.getMemberProfile(token);
      setMemberData(data);
    } catch (error) {
      console.error("Failed to load member data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const getSpecificMemberProfile = useCallback(
    async (memberId: string) => {
      if (!token) {
        return;
      }

      setLoading(true);
      try {
        const data = await memberService.getSpecificMemberProfile(
          token,
          memberId
        );
        setMemberData(data);
      } catch (error) {
        console.error("Failed to load member data:", error);
        toast.error("Failed to load member profile");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateProfile = useCallback(
    async (profileData: ProfileUpdateData) => {
      if (!token) {
        return;
      }

      setSubmitting(true);
      try {
        await memberService.updateProfile(token, profileData);
        await getMemberProfile();
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } catch (error) {
        const err = error as Error;
        toast.error(
          err.message || "Failed to update profile. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
    [token, getMemberProfile]
  );

  const submitMemberRequest = useCallback(async () => {
    if (!token) {
      return;
    }

    setSubmitting(true);
    try {
      await memberService.submitMemberRequest(token);
      await getMemberProfile();
      toast.success("Member request submitted successfully!");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [token, getMemberProfile]);

  const approveMember = useCallback(
    async (memberId: string, message?: string) => {
      if (!token) {
        return;
      }

      setSubmitting(true);
      try {
        await memberService.approveMember(token, memberId, message);
        toast.success("Member approved successfully!");
        await getSpecificMemberProfile(memberId);
      } catch (error) {
        const err = error as Error;
        toast.error(
          err.message || "Failed to approve member. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
    [token, getSpecificMemberProfile]
  );

  const rejectMember = useCallback(
    async (memberId: string, reason: string) => {
      if (!reason || reason.trim().length === 0) {
        return;
      }
      if (!token) {
        return;
      }

      setSubmitting(true);
      try {
        await memberService.rejectMember(token, memberId, reason.trim());
        toast.success("Member rejected successfully!");
        await getSpecificMemberProfile(memberId);
      } catch (error) {
        const err = error as Error;
        toast.error(
          err.message || "Failed to reject member. Please try again."
        );
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
