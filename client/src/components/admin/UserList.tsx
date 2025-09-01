import { UserCheck } from "lucide-react";
import type { UserData } from "@/types";

interface UsersListProps {
  users: UserData[];
  onUserClick: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  loading: boolean;
}

export const UsersList = ({
  users,
  onUserClick,
  onDeleteUser,
  loading,
}: UsersListProps) => {
  if (users.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No users found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors duration-200 border border-gray-200 hover:border-blue-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="space-y-1 flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {user.fullName}
              </h3>
              <p className="text-gray-600">{user.email}</p>
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
              <span className="text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteUser(user._id);
                }}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
