import { useState } from "react";
import { Archive, Eye, Calendar, User } from "lucide-react";
import type { ArchivedUser } from "@/types";
import { ArchivedUserDetailModal } from "./ArchivedUserDetailModal";

interface ArchivedUsersListProps {
  archivedUsers: ArchivedUser[];
  loading: boolean;
}

export const ArchivedUsersList = ({
  archivedUsers,
  loading,
}: ArchivedUsersListProps) => {
  const [selectedUser, setSelectedUser] = useState<ArchivedUser | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleViewDetails = (user: ArchivedUser) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
  };

  if (archivedUsers.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <Archive className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 text-lg">No archived users found</p>
        <p className="text-slate-400 text-sm mt-2">
          Archived users will appear here when users are removed from the system
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Count Badge */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">
          <Archive className="w-4 h-4 text-amber-600" />
          <span className="text-amber-700">
            <span className="font-semibold">{archivedUsers.length}</span>{" "}
            Archived Users
          </span>
        </div>
      </div>

      {/* Archived Users List */}
      <div className="space-y-3">
        {archivedUsers.map((user) => (
          <div
            key={user._id}
            className="bg-slate-50 hover:bg-amber-50/50 rounded-xl p-4 transition-colors duration-200 border border-slate-200 hover:border-amber-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-semibold text-slate-800">
                  {user.fullName}
                </h3>
                <p className="text-slate-600">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                    Archived
                  </span>
                  {user.profile?.membershipId && (
                    <span className="text-sm text-slate-500 font-mono">
                      ID: {user.profile.membershipId}
                    </span>
                  )}
                </div>
                {user.archiveReason && (
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                    Reason: {user.archiveReason}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(user.archivedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {user.archivedBy?.fullName || "System"}
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(user)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <ArchivedUserDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </div>
  );
};
