import { VolunteerBtn, DonateBtn } from "@/components/misc/Buttons";
import {
  Phone,
  Mail,
  Users,
  BookOpen,
  Heart,
  Droplets,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/common";

const JoinOurMission = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-saffron-50 via-white to-india-green-50 overflow-hidden">
      {/* Subtle gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 0% 0%, rgba(255, 153, 51, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 100% 100%, rgba(19, 136, 8, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* Single subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-saffron-100/20 to-india-green-100/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          {/* Mission Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 border border-saffron-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg backdrop-blur animate-fade-in">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-saffron-600" />
            <span className="bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent font-bold text-xs sm:text-sm tracking-wide">
              SERVING BIHAR
            </span>
            <div className="w-2 h-2 rounded-full bg-india-green-600 animate-pulse" />
          </div>

          {/* Title */}
          <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight animate-fade-in animation-delay-100">
            <span className="block bg-gradient-to-r from-saffron-600 via-slate-800 to-india-green-600 bg-clip-text text-transparent">
              BIHAR'S
            </span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-saffron-500 to-india-green-600 bg-clip-text text-transparent">
              YOUTH POWER
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-600 font-medium animate-fade-in animation-delay-200">
            Azad Youth Organisation
          </p>

          {/* Tricolor bar */}
          <div className="flex justify-center gap-1.5 mt-5 sm:mt-6">
            <div className="h-1 sm:h-1.5 w-10 sm:w-12 rounded-full bg-saffron-500" />
            <div className="h-1 sm:h-1.5 w-5 sm:w-6 rounded-full bg-slate-300" />
            <div className="h-1 sm:h-1.5 w-10 sm:w-12 rounded-full bg-india-green-500" />
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16 max-w-4xl mx-auto">
          <StatCard
            number={25000}
            label="Lives Transformed"
            icon={Users}
            color="saffron"
            suffix="+"
            animate
          />
          <StatCard
            number={150}
            label="Education Centers"
            icon={BookOpen}
            color="blue"
            suffix="+"
            animate
          />
          <StatCard
            number={500}
            label="Villages Served"
            icon={Droplets}
            color="green"
            suffix="+"
            animate
          />
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed mb-8 sm:mb-10">
              From villages to cities across Bihar, we empower youth through
              education, healthcare, and employment. Together, we are building
              <span className="bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent font-bold mx-1 sm:mx-2">
                a new Bihar
              </span>
              where every young person has the opportunity to thrive and
              contribute to their community.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
              <div className="group bg-white/80 backdrop-blur border border-saffron-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-saffron-100 to-saffron-200 group-hover:scale-110 transition-transform">
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-saffron-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-saffron-600">
                    Become a Volunteer
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Join our mission in education, healthcare, and community
                  development. Make a real difference in Bihar's rural areas and
                  urban communities.
                </p>
              </div>

              <div className="group bg-white/80 backdrop-blur border border-india-green-200 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-india-green-100 to-india-green-200 group-hover:scale-110 transition-transform">
                    <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-india-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-india-green-600">
                    Support Our Cause
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Through transparent and effective donations, help improve
                  education and healthcare services for underprivileged children
                  and families.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <VolunteerBtn
              classStyle="my-1 sm:my-2 justify-center"
              onClick={() => navigate("/login")}
              isLoggedIn={false}
            />
            <DonateBtn
              classStyle="my-1 sm:my-2 justify-center"
              onClick={() => navigate("/donate")}
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
            {/* Header with tricolor */}
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-saffron-500 via-white to-india-green-500" />

            {/* Contact Content */}
            <div className="p-5 sm:p-6 md:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                <p className="text-slate-600 mt-1.5 sm:mt-2 text-sm sm:text-base">
                  Ready to make a difference in Bihar?
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <a
                  href="tel:+919942495941"
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-saffron-50 to-saffron-100 hover:from-saffron-100 hover:to-saffron-200 border border-saffron-200 rounded-xl sm:rounded-2xl transition-all duration-300 group"
                >
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 text-white group-hover:scale-110 transition-transform shadow-lg">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-saffron-700 font-medium text-xs sm:text-sm">
                      Phone Number
                    </div>
                    <div className="text-slate-800 font-bold text-base sm:text-lg">
                      +91 9942495941
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="mailto:ayoindia1@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-india-green-50 to-india-green-100 hover:from-india-green-100 hover:to-india-green-200 border border-india-green-200 rounded-xl sm:rounded-2xl transition-all duration-300 group"
                >
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-india-green-500 to-india-green-600 text-white group-hover:scale-110 transition-transform shadow-lg">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-india-green-700 font-medium text-xs sm:text-sm">
                      Email Address
                    </div>
                    <div className="text-slate-800 font-bold text-base sm:text-lg">
                      ayoindia1@gmail.com
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-india-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-slate-500 text-xs sm:text-sm italic">
                  "Service is Success" - Azad Youth Organisation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinOurMission;
