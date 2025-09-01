import { LogOut, User as UserIcon } from "lucide-react";

interface AdminHeaderProps {
  currentUser: any;
  onLogout: () => void;
}

export const AdminHeader = ({ currentUser, onLogout }: AdminHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-orange-200 via-white to-green-200 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your organization with ease
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-green-400 mx-auto sm:mx-0 mt-2 rounded-full"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {currentUser && (
              <div className="flex items-center gap-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <div className="p-2 bg-blue-100 rounded-full">
                  <UserIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {currentUser.fullName}
                  </p>
                  <p className="text-xs text-gray-600">{currentUser.role}</p>
                </div>
              </div>
            )}

            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
