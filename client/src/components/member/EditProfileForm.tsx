import React, { useState } from "react";
import { motion } from "framer-motion";
import type { StoredUser, MemberProfile } from "@/types";

interface EditProfileFormProps {
  user: StoredUser;
  profile: MemberProfile;
  onSave: (data: any) => Promise<any>;
  onCancel: () => void;
  submitting: boolean;
}

export const EditProfileForm = ({
  user,
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-400 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode
            </label>
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Why do you want to join?
          </label>
          <textarea
            name="whyJoin"
            value={formData.whyJoin}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 font-semibold"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};
