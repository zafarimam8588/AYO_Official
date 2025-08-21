import { VolunteerBtn, DonateBtn } from "@/components/misc/Buttons";
import { Phone, Mail, Users, BookOpen, Heart, Droplets } from "lucide-react";

const JoinOurMission = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 text-slate-800 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FF9933 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #138808 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Moving dots animation */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-orange-400 rounded-full animate-ping" />
        <div
          className="absolute top-32 right-16 w-2 h-2 bg-green-500 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-3 h-3 bg-orange-400 rounded-full animate-ping"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Mission Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 border border-orange-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg backdrop-blur">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-bold text-sm sm:text-base tracking-wide">
              SERVING BIHAR
            </span>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-600 animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent">
              BIHAR'S
            </span>
            <span className="block relative mt-2">
              <span className="bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
                YOUTH POWER
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-300 to-green-300 bg-clip-text text-transparent opacity-30 blur-sm">
                YOUTH POWER
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mt-4 text-lg sm:text-xl text-slate-600 font-medium">
            <span className="inline-block">Azad Youth Organisation</span>
            <span className="text-orange-600 ml-2 animate-pulse">●</span>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="bg-white/70 backdrop-blur border border-orange-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  25,000+
                </div>
                <div className="text-slate-600 text-xs sm:text-sm font-medium">
                  Lives Transformed
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur border border-slate-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">
                  150+
                </div>
                <div className="text-slate-600 text-xs sm:text-sm font-medium">
                  Education Centers
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur border border-green-200 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-md">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-slate-600 text-xs sm:text-sm font-medium">
                  Villages Served
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
              From villages to cities across Bihar, we empower youth through
              education, healthcare, and employment. Together, we are building
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-bold mx-2">
                a new Bihar
              </span>
              where every young person has the opportunity to thrive and
              contribute to their community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/80 backdrop-blur border border-orange-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent font-bold text-lg mb-3 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-orange-600" />
                  Become a Volunteer
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Join our mission in education, healthcare, and community
                  development. Make a real difference in Bihar's rural areas and
                  urban communities.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur border border-green-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent font-bold text-lg mb-3 flex items-center gap-3">
                  <Droplets className="h-6 w-6 text-green-600" />
                  Support Our Cause
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Through transparent and effective donations, help improve
                  education and healthcare services for underprivileged children
                  and families.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Volunteer */}
            <VolunteerBtn classStyle="my-2  justify-center" />
            <DonateBtn classStyle="my-2  justify-center" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur border border-orange-200 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header with tricolor */}
            <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 bg-orange-600 rounded-full animate-pulse" />
                <span className="text-slate-800 font-bold text-lg">
                  Contact Center
                </span>
                <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Contact Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                <p className="text-slate-600 mt-2">
                  Ready to make a difference in Bihar?
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-2xl transition-all duration-300 cursor-pointer group">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white group-hover:scale-110 transition-transform shadow-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-orange-700 font-semibold text-sm">
                      Phone Number
                    </div>
                    <div className="text-slate-800 font-bold text-lg ">
                      +91 7836950052
                    </div>
                  </div>
                  <div className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    Call Now →
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-2xl transition-all duration-300 cursor-pointer group">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white group-hover:scale-110 transition-transform shadow-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-green-700 font-semibold text-sm">
                      Email Address
                    </div>
                    <div className="text-slate-800 font-bold text-lg">
                      info@azadyouth.org
                    </div>
                  </div>
                  <div className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    Send Email →
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-slate-600 text-sm italic">
                  "Service is Success" - Azad Youth Organisation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinOurMission;
