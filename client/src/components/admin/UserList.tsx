import { useState } from "react";
import { UserCheck, Users } from "lucide-react";
import type { UserData } from "@/types";
import { ArchiveUserModal } from "./ArchiveUserModal";

interface UsersListProps {
  users: UserData[];
  onUserClick: (userId: string) => void;
  onArchiveUser: (userId: string, archiveReason?: string) => Promise<void>;
  loading: boolean;
}

export const UsersList = ({
  users,
  onUserClick: _onUserClick,
  onArchiveUser,
  loading,
}: UsersListProps) => {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);

  // Suppress unused variable warning
  void _onUserClick;

  const handleArchiveClick = (user: UserData) => {
    setSelectedUser(user);
    setShowArchiveModal(true);
  };

  const handleArchiveConfirm = async (archiveReason?: string) => {
    if (!selectedUser) {
      return;
    }

    setIsArchiving(true);
    try {
      await onArchiveUser(selectedUser._id, archiveReason);
      setShowArchiveModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error archiving user:", error);
    } finally {
      setIsArchiving(false);
    }
  };

  const handleArchiveCancel = () => {
    setShowArchiveModal(false);
    setSelectedUser(null);
  };

  if (users.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <UserCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 text-lg">No users found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Total Count Badge */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700">
            <span className="font-semibold">{users.length}</span> Total Users
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-colors duration-200 border border-slate-200 hover:border-blue-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-semibold text-slate-800">
                  {user.fullName}
                </h3>
                <p className="text-slate-600">{user.email}</p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      user.isProfileComplete
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-orange-100 text-orange-700 border-orange-200"
                    }`}
                  >
                    Profile is
                    {user.isProfileComplete ? " Completed" : " Not Completed"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArchiveClick(user);
                  }}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  Archive User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Archive User Modal */}
      <ArchiveUserModal
        isOpen={showArchiveModal}
        onClose={handleArchiveCancel}
        onConfirm={handleArchiveConfirm}
        user={selectedUser}
        isArchiving={isArchiving}
      />
    </div>
  );
};
