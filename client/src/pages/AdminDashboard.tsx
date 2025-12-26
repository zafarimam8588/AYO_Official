import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Clock, XCircle, Users, Mail, Image } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useAdminData } from "@/hooks/useAdminData";
import { useSubscribedEmails } from "@/hooks/useSubscribedEmails";
import { filterMembers, filterUsers } from "@/utils/adminUtils";
import { getPictureStats } from "@/services/pictureService";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { PendingApprovals } from "@/components/admin/PendingApproval";
import { SearchInput } from "@/components/admin/SearchInput";
import { LoadingSpinner } from "@/components/misc/Spinner";
import { NavigationTabs } from "@/components/admin/NavigationTab";
import { MembersList } from "@/components/admin/MemberList";
import { UsersList } from "@/components/admin/UserList";
import { SubscribedEmailsList } from "@/components/admin/SubscribedEmailsList";
import { PictureStatsView } from "@/components/admin/PictureStats";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, currentUser, handleLogout, isAuthenticated } = useAuth();

  const {
    dashboardStats,
    members,
    users,
    pendingMembers,
    loading,
    statsLoading,
    fetchDashboardStats,
    fetchAllMembers,
    fetchUsers,
    fetchPendingMembers,
    approveMember,
    rejectMember,
    deleteUser,
  } = useAdminData(token);

  const [activeView, setActiveView] = useState<
    "dashboard" | "members" | "users" | "emails" | "pictures"
  >("dashboard");
  const {
    subscribedEmails,
    loading: emailsLoading,
    error: emailsError,
    fetchSubscribedEmails,
    deleteSubscribedEmail,
    sendEmailToAll,
  } = useSubscribedEmails(token);

  const [searchTerm, setSearchTerm] = useState("");
  const [totalPictures, setTotalPictures] = useState(0);
  const [picturesLoading, setPicturesLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats();
      fetchPendingMembers();
      fetchPictureStats();
    }
  }, [isAuthenticated, fetchDashboardStats, fetchPendingMembers]);

  const fetchPictureStats = async () => {
    try {
      setPicturesLoading(true);
      const response = await getPictureStats();
      setTotalPictures(response.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch picture stats:", error);
    } finally {
      setPicturesLoading(false);
    }
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/admin/member/${memberId}`);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/admin/user/${userId}`);
  };

  const handleMembersTabClick = () => {
    if (members.length === 0) fetchAllMembers();
  };

  const handleUsersTabClick = () => {
    if (users.length === 0) fetchUsers();
  };

  const handleEmailsTabClick = () => {
    if (subscribedEmails.length === 0) {
      fetchSubscribedEmails();
    }
  };

  const filteredMembers = filterMembers(members, searchTerm);
  const filteredUsers = filterUsers(users, searchTerm);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-green-100 relative overflow-x-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,153,51,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,153,51,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 overflow-x-hidden">
        <AdminHeader currentUser={currentUser} onLogout={handleLogout} />

        <NavigationTabs
          activeView={activeView}
          onViewChange={setActiveView}
          onMembersClick={handleMembersTabClick}
          onUsersClick={handleUsersTabClick}
          onEmailsClick={handleEmailsTabClick}
        />

        <div className="container mx-auto px-4 pb-8">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <StatCard
                  title="Total Members"
                  value={dashboardStats.overview.totalMembers}
                  icon={<UserCheck className="w-8 h-8 text-orange-600" />}
                  borderColor="border-orange-400"
                  bgColor="bg-orange-100"
                  loading={statsLoading}
                />
                <StatCard
                  title="Pending"
                  value={dashboardStats.overview.pendingMembers}
                  icon={<Clock className="w-8 h-8 text-yellow-600" />}
                  borderColor="border-yellow-400"
                  bgColor="bg-yellow-100"
                  loading={statsLoading}
                />
                <StatCard
                  title="Rejected"
                  value={dashboardStats.overview.rejectedMembers}
                  icon={<XCircle className="w-8 h-8 text-green-600" />}
                  borderColor="border-green-400"
                  bgColor="bg-green-100"
                  loading={statsLoading}
                />
                <StatCard
                  title="Total Users"
                  value={dashboardStats.overview.totalUsers}
                  icon={<Users className="w-8 h-8 text-blue-600" />}
                  borderColor="border-blue-400"
                  bgColor="bg-blue-100"
                  loading={statsLoading}
                />
                <StatCard
                  title="Subscribed Emails"
                  value={dashboardStats.overview.totalSubscribedEmails}
                  icon={<Mail className="w-8 h-8 text-purple-600" />}
                  borderColor="border-purple-400"
                  bgColor="bg-purple-100"
                  loading={statsLoading}
                />
                <StatCard
                  title="Total Pictures"
                  value={totalPictures}
                  icon={<Image className="w-8 h-8 text-pink-600" />}
                  borderColor="border-pink-400"
                  bgColor="bg-pink-100"
                  loading={picturesLoading}
                />
              </div>

              <PendingApprovals
                pendingMembers={pendingMembers}
                onMemberClick={handleMemberClick}
                onApproveMember={approveMember}
                onRejectMember={rejectMember}
                submitting={loading}
              />
            </div>
          )}

          {/* Members View */}
          {activeView === "members" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search members..."
                    focusColor="focus:border-green-400 focus:ring-green-100"
                  />
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner size="h-12 w-12" />
                  </div>
                ) : (
                  <MembersList
                    members={filteredMembers}
                    onMemberClick={handleMemberClick}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          )}

          {/* Users View */}
          {activeView === "users" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search users..."
                    focusColor="focus:border-blue-400 focus:ring-blue-100"
                  />
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner size="h-12 w-12" />
                  </div>
                ) : (
                  <UsersList
                    users={filteredUsers}
                    onUserClick={handleUserClick}
                    onDeleteUser={deleteUser}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          )}

          {/* Subscribed Emails View */}
          {activeView === "emails" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {emailsError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{emailsError}</p>
                  </div>
                )}

                <SubscribedEmailsList
                  emails={subscribedEmails}
                  loading={emailsLoading}
                  onDelete={deleteSubscribedEmail}
                  onSendEmailToAll={sendEmailToAll}
                />
              </div>
            </div>
          )}

          {/* Pictures View */}
          {activeView === "pictures" && (
            <div className="space-y-6">
              <PictureStatsView />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
