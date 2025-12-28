import React, { useState } from "react";
import { Save, X } from "lucide-react";
import type { StoredUser, MemberProfile, ProfileUpdateData } from "@/types";
import { RotatingBorderButton } from "./RotatingBorderButton";

interface EditProfileFormProps {
  user: StoredUser;
  profile: MemberProfile;
  onSave: (data: ProfileUpdateData) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
}

export const EditProfileForm = ({
  user: _user,
  profile,
  onSave,
  onCancel,
  submitting,
}: EditProfileFormProps) => {
  const [formData, setFormData] = useState({
    phoneNumber: profile.phoneNumber || "",
    dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split("T")[0] : "",
    gender: profile.gender?.toLowerCase() || "",
    whyJoin: profile.whyJoin || "",
    address: {
      street: profile.address?.street || "",
      city: profile.address?.city || "",
      state: profile.address?.state || "",
      pincode: profile.address?.pincode || "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-saffron-50 via-white to-india-green-50 px-5 sm:px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Update your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                         focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                         transition-all duration-200 text-sm"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                         focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                         transition-all duration-200 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                         focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                         transition-all duration-200 text-sm cursor-pointer"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                         focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                         transition-all duration-200 text-sm"
              placeholder="Enter street address"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              City
            </label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                         focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                         transition-all duration-200 text-sm"
              placeholder="Enter city"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              State
            </label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                         focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                         transition-all duration-200 text-sm"
              placeholder="Enter state"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Pincode
            </label>
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                         focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                         transition-all duration-200 text-sm"
              placeholder="Enter pincode"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Why do you want to join?
          </label>
          <textarea
            name="whyJoin"
            value={formData.whyJoin}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50
                       focus:bg-white focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-400
                       transition-all duration-200 text-sm resize-none"
            placeholder="Tell us about your motivation..."
            required
          />
        </div>

        {/* Buttons with Rotating Border Animation */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Save Button */}
          <div className="flex-1">
            <RotatingBorderButton
              type="submit"
              disabled={submitting}
              variant="primary"
              className="w-full"
            >
              {submitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </RotatingBorderButton>
          </div>

          {/* Cancel Button */}
          <div className="flex-1">
            <RotatingBorderButton
              type="button"
              onClick={onCancel}
              variant="secondary"
              className="w-full"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </RotatingBorderButton>
          </div>
        </div>
      </form>
    </div>
  );
};
