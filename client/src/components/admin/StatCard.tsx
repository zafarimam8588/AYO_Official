import { LoadingSpinner } from "../misc/Spinner";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  borderColor: string;
  bgColor: string;
  loading?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon,
  borderColor,
  bgColor,
  loading = false,
}: StatCardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${borderColor} hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 font-medium">{title}</p>
          {loading ? (
            <div className="mt-2">
              <LoadingSpinner size="w-8 h-8" />
            </div>
          ) : (
            <p className="text-3xl font-bold text-gray-800">{value}</p>
          )}
        </div>
        <div className={`p-3 ${bgColor} rounded-full`}>{icon}</div>
      </div>
    </div>
  );
};
