import { IdCard, CheckCircle, User, Calendar } from "lucide-react";

interface DetailCardProps {
  title: string;
  value: string;
  color: "saffron" | "green" | "red" | "blue" | "purple";
  icon?: "id" | "status" | "user" | "calendar";
}

export const DetailCard = ({ title, value, color, icon }: DetailCardProps) => {
  const colorConfig = {
    saffron: {
      text: "text-saffron-600",
      bg: "bg-saffron-50",
      iconBg: "bg-saffron-100",
      border: "border-saffron-100",
    },
    green: {
      text: "text-india-green-600",
      bg: "bg-india-green-50",
      iconBg: "bg-india-green-100",
      border: "border-india-green-100",
    },
    red: {
      text: "text-red-600",
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      border: "border-red-100",
    },
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      border: "border-blue-100",
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      border: "border-purple-100",
    },
  };

  const config = colorConfig[color];

  const IconComponent = () => {
    const iconClass = `w-4 h-4 ${config.text}`;
    switch (icon) {
      case "id":
        return <IdCard className={iconClass} />;
      case "status":
        return <CheckCircle className={iconClass} />;
      case "user":
        return <User className={iconClass} />;
      case "calendar":
        return <Calendar className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative p-4 ${config.bg} rounded-xl border ${config.border}
                  hover:shadow-md transition-all duration-200`}
    >
      <div className="flex flex-col items-center text-center gap-2">
        {icon && (
          <div className={`p-2 rounded-lg ${config.iconBg}`}>
            <IconComponent />
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">{title}</p>
          <p
            className={`text-sm sm:text-base font-semibold ${config.text} break-words capitalize`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
