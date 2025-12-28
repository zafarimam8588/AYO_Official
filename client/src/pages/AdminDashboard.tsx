import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useAdminData } from "@/hooks/useAdminData";
import { useSubscribedEmails } from "@/hooks/useSubscribedEmails";
import {
  filterMembers,
  filterUsers,
  filterArchivedUsers,
} from "@/utils/adminUtils";
import { getPictureStats } from "@/services/pictureService";
import { getContactMessageStats } from "@/services/contactMessageService";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { NavigationTabs } from "@/components/admin/NavigationTab";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { SearchInput } from "@/components/admin/SearchInput";
import { MembersList } from "@/components/admin/MemberList";
import { UsersList } from "@/components/admin/UserList";
import { ArchivedUsersList } from "@/components/admin/ArchivedUsersList";
import { SubscribedEmailsList } from "@/components/admin/SubscribedEmailsList";
import { PictureStatsView } from "@/components/admin/PictureStats";
import { ImageManager } from "@/components/admin/ImageManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberRowSkeleton, UserRowSkeleton } from "@/components/skeletons";

type ActiveView =
  | "dashboard"
  | "members"
  | "users"
  | "emails"
  | "pictures"
  | "images"
  | "archived";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, currentUser, handleLogout, isAuthenticated } = useAuth();

  const {
    dashboardStats,
    members,
    users,
    archivedUsers,
    pendingMembers,
    loading,
    statsLoading,
    fetchDashboardStats,
    fetchAllMembers,
    fetchUsers,
    fetchArchivedUsers,
    fetchPendingMembers,
    approveMember,
    rejectMember,
    archiveUser,
  } = useAdminData(token);

  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
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
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [memberStatusFilter, setMemberStatusFilter] = useState<
    "all" | "approved" | "rejected"
  >("all");

  const fetchPictureStatsData = useCallback(async () => {
    try {
      setPicturesLoading(true);
      const response = await getPictureStats();
      setTotalPictures(response.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch picture stats:", error);
    } finally {
      setPicturesLoading(false);
    }
  }, []);

  const fetchUnreadMessages = useCallback(async () => {
    try {
      const response = await getContactMessageStats();
      if (response.success) {
        setUnreadMessages(response.data.unread || 0);
      }
    } catch (error) {
      console.error("Failed to fetch message stats:", error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats();
      fetchPendingMembers();
      fetchPictureStatsData();
      fetchUnreadMessages();
    }
  }, [
    isAuthenticated,
    fetchDashboardStats,
    fetchPendingMembers,
    fetchPictureStatsData,
    fetchUnreadMessages,
  ]);

  const handleMemberClick = (memberId: string) => {
    navigate(`/admin/member/${memberId}`);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/admin/user/${userId}`);
  };

  const handleMembersTabClick = () => {
    if (members.length === 0) {
      fetchAllMembers();
    }
  };

  const handleUsersTabClick = () => {
    if (users.length === 0) {
      fetchUsers();
    }
  };

  const handleEmailsTabClick = () => {
    if (subscribedEmails.length === 0) {
      fetchSubscribedEmails();
    }
  };

  const handleArchivedTabClick = () => {
    if (archivedUsers.length === 0) {
      fetchArchivedUsers();
    }
  };

  const handleViewChange = (view: ActiveView) => {
    setActiveView(view);
    setSearchTerm("");
    if (view !== "members") {
      setMemberStatusFilter("all");
    }
  };

  const filteredMembers = filterMembers(members, searchTerm);
  const filteredUsers = filterUsers(users, searchTerm);
  const filteredArchivedUsers = filterArchivedUsers(archivedUsers, searchTerm);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-x-hidden">
      {/* Subtle Background Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ff993306_1px,transparent_1px),linear-gradient(to_bottom,#13880806_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* Decorative Blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-saffron-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-india-green-200/30 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        <AdminHeader currentUser={currentUser} onLogout={handleLogout} />

        <NavigationTabs
          activeView={activeView}
          onViewChange={handleViewChange}
          onMembersClick={handleMembersTabClick}
          onUsersClick={handleUsersTabClick}
          onEmailsClick={handleEmailsTabClick}
          onArchivedClick={handleArchivedTabClick}
        />

        <main className="container mx-auto sm:px-4 pb-8">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div className="px-4 sm:px-0">
              <DashboardOverview
                dashboardStats={dashboardStats}
                pendingMembers={pendingMembers}
                totalPictures={totalPictures}
                statsLoading={statsLoading}
                picturesLoading={picturesLoading}
                submitting={loading}
                onMemberClick={handleMemberClick}
                onApproveMember={approveMember}
                onRejectMember={rejectMember}
                onViewChange={handleViewChange}
                onMembersClick={handleMembersTabClick}
                onUsersClick={handleUsersTabClick}
                onEmailsClick={handleEmailsTabClick}
                unreadMessages={unreadMessages}
              />
            </div>
          )}

          {/* Members View */}
          {activeView === "members" && (
            <Card className="shadow-sm rounded-none sm:rounded-xl border-x-0 sm:border-x">
              <CardHeader className="pb-4 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    All Members
                  </CardTitle>
                  <div className="w-full sm:w-72">
                    <SearchInput
                      value={searchTerm}
                      onChange={setSearchTerm}
                      placeholder="Search members..."
                      focusColor="focus:border-india-green-400 focus:ring-india-green-100"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {loading ? (
                  <MemberRowSkeleton count={5} />
                ) : (
                  <MembersList
                    members={filteredMembers}
                    onMemberClick={handleMemberClick}
                    loading={loading}
                    statusFilter={memberStatusFilter}
                    onStatusFilterChange={setMemberStatusFilter}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Users View */}
          {activeView === "users" && (
            <Card className="shadow-sm rounded-none sm:rounded-xl border-x-0 sm:border-x">
              <CardHeader className="pb-4 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    All Users
                  </CardTitle>
                  <div className="w-full sm:w-72">
                    <SearchInput
                      value={searchTerm}
                      onChange={setSearchTerm}
                      placeholder="Search users..."
                      focusColor="focus:border-blue-400 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {loading ? (
                  <UserRowSkeleton count={5} />
                ) : (
                  <UsersList
                    users={filteredUsers}
                    onUserClick={handleUserClick}
                    onArchiveUser={archiveUser}
                    loading={loading}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Subscribed Emails View */}
          {activeView === "emails" && (
            <Card className="shadow-sm rounded-none sm:rounded-xl border-x-0 sm:border-x">
              <CardHeader className="pb-4 px-4 sm:px-6">
                <CardTitle className="text-xl font-semibold text-slate-800">
                  Subscribed Emails
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {emailsError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{emailsError}</p>
                  </div>
                )}

                <SubscribedEmailsList
                  emails={subscribedEmails}
                  loading={emailsLoading}
                  onDelete={deleteSubscribedEmail}
                  onSendEmailToAll={sendEmailToAll}
                />
              </CardContent>
            </Card>
          )}

          {/* Pictures View */}
          {activeView === "pictures" && <PictureStatsView />}

          {/* Image Manager View */}
          {activeView === "images" && (
            <Card className="shadow-sm rounded-none sm:rounded-xl border-x-0 sm:border-x">
              <CardContent className="px-4 sm:px-6 py-6">
                <ImageManager />
              </CardContent>
            </Card>
          )}

          {/* Archived Users View */}
          {activeView === "archived" && (
            <Card className="shadow-sm rounded-none sm:rounded-xl border-x-0 sm:border-x">
              <CardHeader className="pb-4 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    Archived Users
                  </CardTitle>
                  <div className="w-full sm:w-72">
                    <SearchInput
                      value={searchTerm}
                      onChange={setSearchTerm}
                      placeholder="Search archived users..."
                      focusColor="focus:border-amber-400 focus:ring-amber-100"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {loading ? (
                  <UserRowSkeleton count={5} />
                ) : (
                  <ArchivedUsersList
                    archivedUsers={filteredArchivedUsers}
                    loading={loading}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
