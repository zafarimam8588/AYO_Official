import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Users,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Member } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ApproveMemberModal } from "../ApproveMemberModal";
import { RejectMemberModal } from "../RejectMemberModal";
import { useIsViewer } from "@/context/AdminContext";
import { showToast } from "@/lib/toast";

interface PendingApprovalsPanelProps {
  pendingMembers: Member[];
  onMemberClick: (memberId: string) => void;
  onApproveMember: (memberId: string, message?: string) => void;
  onRejectMember: (memberId: string, reason: string) => void;
  submitting?: boolean;
  loading?: boolean;
}

export function PendingApprovalsPanel({
  pendingMembers,
  onMemberClick,
  onApproveMember,
  onRejectMember,
  submitting = false,
  loading = false,
}: PendingApprovalsPanelProps) {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState<string>("");
  const isViewer = useIsViewer();

  const handleApproveClick = (memberId: string, memberName: string) => {
    if (isViewer) {
      showToast.info("You have view-only access");
      return;
    }
    setSelectedMemberId(memberId);
    setSelectedMemberName(memberName);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (memberId: string, memberName: string) => {
    if (isViewer) {
      showToast.info("You have view-only access");
      return;
    }
    setSelectedMemberId(memberId);
    setSelectedMemberName(memberName);
    setIsRejectModalOpen(true);
  };

  const handleApproveConfirm = (message?: string) => {
    if (selectedMemberId) {
      onApproveMember(selectedMemberId, message);
      setIsApproveModalOpen(false);
      setSelectedMemberId(null);
      setSelectedMemberName("");
    }
  };

  const handleRejectConfirm = (reason: string) => {
    if (selectedMemberId) {
      onRejectMember(selectedMemberId, reason);
      setIsRejectModalOpen(false);
      setSelectedMemberId(null);
      setSelectedMemberName("");
    }
  };

  const pendingCount = pendingMembers.length;

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2.5 rounded-xl",
                  pendingCount > 0 ? "bg-amber-100" : "bg-india-green-100"
                )}
              >
                {pendingCount > 0 ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                ) : (
                  <Sparkles className="w-5 h-5 text-india-green-600" />
                )}
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800">
                  Pending Approvals
                </CardTitle>
                <p className="text-sm text-slate-500">
                  {pendingCount > 0
                    ? "Members awaiting your review"
                    : "All applications have been reviewed"}
                </p>
              </div>
            </div>

            {pendingCount > 0 && (
              <Badge
                variant="pending"
                className="animate-pulse text-sm px-3 py-1"
              >
                <Clock className="w-3.5 h-3.5 mr-1" />
                {pendingCount} Pending
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {pendingCount === 0 ? (
            <div className="text-center py-8">
              <div className="p-4 bg-india-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-india-green-600" />
              </div>
              <p className="text-slate-600 font-medium">
                All caught up! No pending approvals.
              </p>
              <p className="text-sm text-slate-400 mt-1">
                New applications will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingMembers.map((member, index) => (
                <div
                  key={member._id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={cn(
                    "group bg-gradient-to-r from-slate-50 to-white",
                    "rounded-xl p-4 border border-slate-200",
                    "hover:border-amber-300 hover:shadow-md",
                    "transition-all duration-200 animate-fade-in-up"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div
                      className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
                      onClick={() => onMemberClick(member._id)}
                    >
                      <div className="flex-shrink-0 p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:border-amber-200 transition-colors">
                        <Users className="w-5 h-5 text-slate-600 group-hover:text-amber-600 transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-800 truncate group-hover:text-amber-700 transition-colors">
                          {member.userId?.fullName || "Unknown Member"}
                        </h4>
                        <p className="text-slate-500 text-sm truncate">
                          {member.userId?.email || "No email provided"}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>

                    <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                      <Button
                        variant="green"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApproveClick(
                            member._id,
                            member.userId?.fullName || "Member"
                          );
                        }}
                        className="shadow-sm"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectClick(
                            member._id,
                            member.userId?.fullName || "Member"
                          );
                        }}
                        className="shadow-sm"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <ApproveMemberModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApproveConfirm}
        submitting={submitting}
        memberName={selectedMemberName}
      />

      <RejectMemberModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
        submitting={submitting}
        memberName={selectedMemberName}
      />
    </>
  );
}
