import React, { useEffect } from "react";
import { X, Archive, User, FileText, MapPin, Phone, Mail } from "lucide-react";
import type { ArchivedUser } from "@/types";

interface ArchivedUserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: ArchivedUser | null;
}

export const ArchivedUserDetailModal: React.FC<
  ArchivedUserDetailModalProps
> = ({ isOpen, onClose, user }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-amber-50">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                    <Archive className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Archived User Details
                    </h2>
                    <p className="text-sm text-amber-600">Read-only view</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                >
                  <X className="w-6 h-6 cursor-pointer" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* User Info Section */}
                <section>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" /> User Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                    <div>
                      <label className="text-sm text-slate-500">
                        Full Name
                      </label>
                      <p className="font-medium text-slate-800">
                        {user.fullName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email
                      </label>
                      <p className="font-medium text-slate-800">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">Role</label>
                      <p className="font-medium text-slate-800 capitalize">
                        {user.role}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">
                        Email Verified
                      </label>
                      <p className="font-medium text-slate-800">
                        {user.isVerified ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">
                        Profile Complete
                      </label>
                      <p className="font-medium text-slate-800">
                        {user.isProfileComplete ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-500">
                        Account Created
                      </label>
                      <p className="font-medium text-slate-800">
                        {formatDate(user.userCreatedAt)}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Profile Info Section (if exists) */}
                {user.profile && (
                  <section>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5" /> Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                      {user.profile.phoneNumber && (
                        <div>
                          <label className="text-sm text-slate-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> Phone
                          </label>
                          <p className="font-medium text-slate-800">
                            {user.profile.phoneNumber}
                          </p>
                        </div>
                      )}
                      {user.profile.membershipId && (
                        <div>
                          <label className="text-sm text-slate-500">
                            Membership ID
                          </label>
                          <p className="font-medium text-slate-800 font-mono">
                            {user.profile.membershipId}
                          </p>
                        </div>
                      )}
                      {user.profile.memberStatus && (
                        <div>
                          <label className="text-sm text-slate-500">
                            Member Status
                          </label>
                          <p className="font-medium text-slate-800 capitalize">
                            {user.profile.memberStatus.replace("_", " ")}
                          </p>
                        </div>
                      )}
                      {user.profile.gender && (
                        <div>
                          <label className="text-sm text-slate-500">
                            Gender
                          </label>
                          <p className="font-medium text-slate-800">
                            {user.profile.gender}
                          </p>
                        </div>
                      )}
                      {user.profile.dateOfBirth && (
                        <div>
                          <label className="text-sm text-slate-500">
                            Date of Birth
                          </label>
                          <p className="font-medium text-slate-800">
                            {new Date(
                              user.profile.dateOfBirth
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {user.profile.address && (
                        <div className="md:col-span-2">
                          <label className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Address
                          </label>
                          <p className="font-medium text-slate-800">
                            {user.profile.address.street},{" "}
                            {user.profile.address.city},{" "}
                            {user.profile.address.state} -{" "}
                            {user.profile.address.pincode}
                          </p>
                        </div>
                      )}
                      {user.profile.whyJoin && (
                        <div className="md:col-span-2">
                          <label className="text-sm text-slate-500">
                            Why They Joined
                          </label>
                          <p className="font-medium text-slate-800">
                            {user.profile.whyJoin}
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Archive Info Section */}
                <section>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Archive className="w-5 h-5" /> Archive Details
                  </h3>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-amber-700">
                          Archived At
                        </label>
                        <p className="font-medium text-slate-800">
                          {formatDate(user.archivedAt)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-amber-700">
                          Archived By
                        </label>
                        <p className="font-medium text-slate-800">
                          {user.archivedBy?.fullName || "System"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-amber-700">
                          Archive Source
                        </label>
                        <p className="font-medium text-slate-800 capitalize">
                          {user.archiveSource.replace("_", " ")}
                        </p>
                      </div>
                      {user.archiveReason && (
                        <div className="md:col-span-2">
                          <label className="text-sm text-amber-700">
                            Archive Reason
                          </label>
                          <p className="font-medium text-slate-800">
                            {user.archiveReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="flex justify-end p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
