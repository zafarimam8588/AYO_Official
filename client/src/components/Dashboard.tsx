import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type StoredUser = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: boolean;
  isProfileComplete: boolean;
};

export interface LogoutSuccess {
  success: true;
  message: "Logged out successfully";
}
export interface LogoutError {
  success: false;
  message: string;
  error?: string;
}

type LogoutResponse = LogoutSuccess | LogoutError;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");

    const user = rawUser ? JSON.parse(rawUser) : null;
    console.log(user);
    const token = localStorage.getItem("authToken");
    if (user && token) {
      setUser(user);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    const { data } = await axios.post<LogoutResponse>(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/logout`,
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(data);
    if (data.success) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } else {
      alert(data.message);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-orange-600">{user?.fullName}</span>!
        </h1>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-600 transition hover:cursor-pointer"
        >
          Log out
        </button>
      </header>

      {/* Stats grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Active Projects" value="12" />
        <StatCard title="Volunteers Managed" value="237" />
        <StatCard title="Funds Raised (₹)" value="1.4 L " />
      </section>

      {/* Dummy recent activity */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Recent Activity
        </h2>
        <ul className="space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow">
          <li>You approved 3 new volunteers.</li>
          <li>A donation of ₹10,000 was received for Project Green.</li>
          <li>
            Profile completion reminder sent to{" "}
            <span className="font-semibold">15 members</span>.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;

/* Small reusable card */
const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="rounded-lg bg-white p-6 shadow hover:shadow-md transition">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
  </div>
);
