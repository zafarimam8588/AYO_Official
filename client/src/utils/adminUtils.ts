import type { Member, UserData, ArchivedUser } from "@/types";

export const getStatusBadge = (status: string): string => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "rejected":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const filterMembers = (
  members: Member[],
  searchTerm: string
): Member[] => {
  return members.filter(
    (member) =>
      member.userId?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterUsers = (
  users: UserData[],
  searchTerm: string
): UserData[] => {
  return users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterArchivedUsers = (
  archivedUsers: ArchivedUser[],
  searchTerm: string
): ArchivedUser[] => {
  if (!searchTerm.trim()) {
    return archivedUsers;
  }

  const term = searchTerm.toLowerCase();
  return archivedUsers.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.profile?.membershipId?.toLowerCase().includes(term)
  );
};
