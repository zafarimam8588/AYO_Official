import { Heart } from "lucide-react";

export const DesktopSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-green-600 relative overflow-hidden">
      <DecorativeShapes />

      <div className="flex flex-col justify-center items-start p-12 relative z-10 text-white">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
              <Heart className="w-7 h-7 text-orange-600" />
            </div>
            <span className="text-3xl font-bold">AYO</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Welcome Back,
            <br />
            Changemaker! 🌟
          </h1>
          <p className="text-orange-100 text-lg leading-relaxed">
            Ready to continue making a difference? Your community of passionate
            youth leaders is waiting for you to return!
          </p>
        </div>

        <StatsGrid />
      </div>
    </div>
  );
};

const DecorativeShapes = () => (
  <>
    <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          fill="white"
          d="M40.7,-65.2C50.9,-58.1,56.3,-42.5,63.4,-27.2C70.5,-11.9,79.3,3.1,79.9,19.2C80.5,35.3,72.9,52.5,60.1,63.1C47.3,73.7,29.3,77.7,11.8,78.5C-5.7,79.3,-22.7,76.9,-37.4,69.3C-52.1,61.7,-64.5,48.9,-71.7,33.4C-78.9,17.9,-80.9,-0.3,-77.8,-17.2C-74.7,-34.1,-66.5,-49.7,-54.4,-56C-42.3,-62.3,-26.3,-59.3,-10.1,-59.8C6.1,-60.3,30.5,-72.3,40.7,-65.2Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
    <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path
          fill="white"
          d="M51.4,-72.8C66.3,-65.1,77.4,-49.7,82.9,-32.1C88.4,-14.5,88.3,5.3,83.8,23.4C79.3,41.5,70.4,58,57.2,68.9C44,79.8,26.5,85.1,8.2,84.4C-10.1,83.7,-29.2,76.9,-44.3,66.4C-59.4,55.9,-70.5,41.7,-76.8,25.2C-83.1,8.7,-84.6,-10.1,-80.3,-27.1C-76,-44.1,-65.9,-59.3,-51.8,-67.2C-37.7,-75.1,-18.8,-75.7,-0.3,-75.2C18.2,-74.7,36.5,-80.5,51.4,-72.8Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  </>
);

const StatsGrid = () => (
  <div className="grid grid-cols-3 gap-8 mt-8">
    <div className="text-center">
      <div className="text-2xl font-bold">5K+</div>
      <div className="text-orange-200 text-sm">Active Members</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold">100+</div>
      <div className="text-orange-200 text-sm">Live Projects</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold">50+</div>
      <div className="text-orange-200 text-sm">Cities Reached</div>
    </div>
  </div>
);
