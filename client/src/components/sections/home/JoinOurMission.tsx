import { VolunteerBtn, DonateBtn } from "@/components/misc/Buttons";
import { Phone, Mail, Star, Zap, Shield, Target } from "lucide-react";

const JoinOurMission = () => {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Green Tech Background */}
      <div className="absolute inset-0">
        {/* Digital Elements */}
        <div className="absolute top-10 left-20 w-2 h-2 bg-green-300"></div>
        <div className="absolute top-32 right-40 w-1 h-1 bg-emerald-300"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-lime-300"></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-green-400"></div>

        {/* Green Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-green-500/10 blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-lime-500/10 blur-3xl"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-green-400/20"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Mission Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 px-8 py-3 mb-8 backdrop-blur-sm">
            <Zap className="h-5 w-5 text-green-300" />
            <span className="text-green-300 font-semibold text-lg">
              MISSION ACTIVE
            </span>
            <div className="w-3 h-3 bg-green-400"></div>
          </div>

          {/* Title with Green Tech Style */}
          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400">
              JOIN THE
            </span>
            <span className="block relative">
              <span className="text-white">REVOLUTION</span>
              <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                REVOLUTION
              </div>
            </span>
          </h1>

          {/* Terminal Text Effect */}
          <div className="text-2xl md:text-3xl text-gray-300 mb-8 font-mono">
            <span className="inline-block">&gt; CHANGING_LIVES.exe</span>
            <span className="text-green-400 ml-2">█</span>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 p-6 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">15,000+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">
                  Lives Impacted
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-lime-500/10 border border-emerald-400/30 p-6 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">100+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">
                  Projects Active
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-lime-500/10 to-green-500/10 border border-lime-400/30 p-6 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-lime-500">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-lime-400">5-Star</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">
                  Impact Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              Step into the future of humanitarian work. Where technology meets
              compassion, and every action creates a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-bold">
                ripple effect
              </span>{" "}
              across communities worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-slate-800/50 border border-slate-700 p-6 backdrop-blur-sm">
                <h3 className="text-green-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  VOLUNTEER PROTOCOL
                </h3>
                <p className="text-gray-400">
                  Join our elite team of change-makers. Deploy your skills where
                  they matter most. Real impact, real results.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 p-6 backdrop-blur-sm">
                <h3 className="text-emerald-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  DONATION SYSTEM
                </h3>
                <p className="text-gray-400">
                  Fuel the mission with transparent, trackable contributions.
                  Watch your impact multiply across our global network.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Green Tech Style */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <VolunteerBtn classStyle="bg-slate-800 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 transform hover:scale-110 transition-all duration-300 font-bold text-lg px-8 py-4 uppercase tracking-wide" />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-lime-500 blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <DonateBtn classStyle="bg-slate-800 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 transform hover:scale-110 transition-all duration-300 font-bold text-lg px-8 py-4 uppercase tracking-wide" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Terminal */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 border border-slate-600 overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500"></div>
              <div className="w-3 h-3 bg-yellow-500"></div>
              <div className="w-3 h-3 bg-green-500"></div>
              <span className="ml-4 text-gray-400 text-sm font-mono">
                contact_terminal_v2.4
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono">
              <div className="text-green-400 mb-4">
                <span>$</span> ./connect_to_mission.sh
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className="p-2 bg-green-600 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-green-400 text-sm">VOICE_CHANNEL:</div>
                    <div className="text-white font-bold">+91 7836950052</div>
                  </div>
                  <div className="ml-auto text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    [CONNECT]
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className="p-2 bg-emerald-600 group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-emerald-400 text-sm">DATA_STREAM:</div>
                    <div className="text-white font-bold">
                      info@hopefoundation.org
                    </div>
                  </div>
                  <div className="ml-auto text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    [SEND]
                  </div>
                </div>
              </div>

              <div className="mt-6 text-gray-400 text-sm">
                <span className="text-green-400">&gt;</span> Connection
                established. Ready to deploy humanity.exe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinOurMission;
