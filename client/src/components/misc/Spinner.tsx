export const LoadingSpinner = ({ size = "w-6 h-6" }: { size?: string }) => (
  <div className="flex justify-center items-center">
    <div
      className={`animate-spin rounded-full border-b-2 border-orange-600 ${size}`}
    ></div>
  </div>
);
