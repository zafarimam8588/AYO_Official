export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="relative">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse text-orange-500 font-semibold">
          Loading…
        </div>
      </div>
    </div>
  </div>
);
