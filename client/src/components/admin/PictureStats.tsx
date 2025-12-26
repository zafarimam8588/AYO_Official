import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { getPictureStats } from "@/services/pictureService";
import type { PictureStats } from "@/types";

export const PictureStatsView = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<PictureStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getPictureStats();
      setStats(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch picture stats");
    } finally {
      setLoading(false);
    }
  };

  const getPageLabel = (pageValue: string): string => {
    const labels: { [key: string]: string } = {
      home: "Home Page",
      about: "About Us",
      programs: "Programs",
      gallery: "Gallery",
      contact: "Contact",
      donate: "Donate",
      team: "Our Team",
      partnership: "Partnership",
      events: "Events",
      achievements: "Achievements",
      testimonials: "Testimonials",
      other: "Other",
    };
    return labels[pageValue] || pageValue;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading picture statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Statistics */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-pink-500" />
          Overall Statistics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-4 rounded-xl border border-pink-200">
            <p className="text-sm text-gray-600 mb-1">Total Pictures</p>
            <p className="text-3xl font-bold text-pink-600">
              {stats?.total || 0}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Pages with Images</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats?.byPage?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Pictures by Page */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-orange-500" />
          Pictures by Page
        </h3>

        {stats?.byPage && stats.byPage.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.byPage
              .sort((a, b) => b.count - a.count)
              .map((page) => (
                <div
                  key={page._id}
                  className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">
                        {getPageLabel(page._id)}
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {page.count}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {page.count === 1 ? "picture" : "pictures"}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-pink-600" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg">No pictures uploaded yet</p>
            <p className="text-sm mt-2">
              Click "Upload New Picture" to get started
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/admin/upload-pic")}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 border border-pink-200 rounded-xl transition-all duration-200 hover:shadow-md w-full sm:w-auto"
          >
            <ImageIcon className="w-8 h-8 text-pink-600" />
            <div className="text-left cursor-pointer">
              <p className="font-semibold text-gray-800">Manage Pictures</p>
              <p className="text-sm text-gray-600">
                Upload, view, edit, and delete images
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
