interface DetailCardProps {
  title: string;
  value: string;
  color: "orange" | "green" | "red" | "blue" | "purple";
}

export const DetailCard = ({ title, value, color }: DetailCardProps) => {
  const colorClasses = {
    orange: "text-orange-600",
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg border border-r-4 border-r-gray-300 hover:shadow-md hover:border-r-orange-300 transition-all duration-200">
      <h3 className="font-medium text-gray-800 text-sm mb-2">{title}</h3>
      <p className={`text-lg font-semibold ${colorClasses[color]} break-words`}>
        {value}
      </p>
    </div>
  );
};
