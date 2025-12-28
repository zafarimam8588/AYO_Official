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
    <div
      className={`flex items-start gap-3 p-3.5 rounded-xl border bg-gray-50/50
                  hover:bg-white hover:shadow-sm transition-all duration-200
                  ${completed ? "border-gray-100" : "border-dashed border-gray-200"}`}
    >
      <div
        className={`p-2 rounded-lg flex-shrink-0 ${
          completed
            ? "bg-india-green-100 text-india-green-600"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 mb-0.5">{label}</p>
        <p
          className={`text-sm font-medium break-words ${
            completed ? "text-gray-800" : "text-gray-400 italic"
          }`}
        >
          {value}
        </p>
      </div>
      {completed && (
        <div className="flex-shrink-0 mt-0.5">
          <CheckCircle className="w-4 h-4 text-india-green-500" />
        </div>
      )}
    </div>
  </div>
);
