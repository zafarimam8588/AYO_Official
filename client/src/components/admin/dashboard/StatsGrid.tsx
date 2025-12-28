import { UserCheck, Clock, XCircle, Users, Mail, Image } from "lucide-react";
import { EnhancedStatCard } from "./EnhancedStatCard";

interface StatsGridProps {
  totalMembers: number;
  pendingMembers: number;
  rejectedMembers: number;
  totalUsers: number;
  totalSubscribedEmails: number;
  totalPictures: number;
  statsLoading: boolean;
  picturesLoading: boolean;
  onStatClick?: (stat: string) => void;
}

export function StatsGrid({
  totalMembers,
  pendingMembers,
  rejectedMembers,
  totalUsers,
  totalSubscribedEmails,
  totalPictures,
  statsLoading,
  picturesLoading,
  onStatClick,
}: StatsGridProps) {
  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      icon: UserCheck,
      color: "saffron" as const,
      loading: statsLoading,
      description: "Approved members",
      key: "members",
    },
    {
      title: "Pending",
      value: pendingMembers,
      icon: Clock,
      color: "amber" as const,
      loading: statsLoading,
      description: "Awaiting approval",
      key: "pending",
    },
    {
      title: "Rejected",
      value: rejectedMembers,
      icon: XCircle,
      color: "red" as const,
      loading: statsLoading,
      description: "Declined applications",
      key: "rejected",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "green" as const,
      loading: statsLoading,
      description: "Registered accounts",
      key: "users",
    },
    {
      title: "Subscribed Emails",
      value: totalSubscribedEmails,
      icon: Mail,
      color: "blue" as const,
      loading: statsLoading,
      description: "Newsletter subscribers",
      key: "emails",
    },
    {
      title: "Total Pictures",
      value: totalPictures,
      icon: Image,
      color: "purple" as const,
      loading: picturesLoading,
      description: "Uploaded images",
      key: "pictures",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <EnhancedStatCard
          key={stat.key}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          loading={stat.loading}
          description={stat.description}
          animationDelay={index * 100}
          onClick={onStatClick ? () => onStatClick(stat.key) : undefined}
        />
      ))}
    </div>
  );
}
