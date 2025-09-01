import { CheckCircle } from "lucide-react";

interface InfoCardProps {
  icon: React.JSX.Element;
  label: string;
  value: string;
  completed?: boolean;
  fullWidth?: boolean;
}

export const InfoCard = ({
  icon,
  label,
  value,
  completed,
  fullWidth,
}: InfoCardProps) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
    <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-gray-100 border-r-4 border-r-gray-200 hover:border-orange-200 hover:border-r-orange-300 transition-colors duration-200">
      <div
        className={`p-2 rounded-lg flex-shrink-0 ${
          completed
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <p
          className={`${completed ? "text-gray-800" : "text-gray-400"} ${
            fullWidth ? "text-sm" : ""
          } break-words`}
        >
          {value}
        </p>
      </div>
      <div className="flex-shrink-0">
        {completed && <CheckCircle className="w-5 h-5 text-green-500" />}
      </div>
    </div>
  </div>
);
