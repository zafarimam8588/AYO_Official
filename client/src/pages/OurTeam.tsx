import { Quote, Users, Heart } from "lucide-react";
import { User } from "lucide-react";
import {
  SectionHeader,
  TeamMemberCard,
  UnifiedCTASection,
} from "@/components/common";

interface TeamMember {
  name: string;
  position: string;
  category: string;
  color: "saffron" | "green";
  description?: string;
  image?: string;
  socialLinks?: {
    type: "linkedin" | "twitter" | "email";
    url: string;
  }[];
}

const OurTeam = () => {
  const leadership: TeamMember[] = [
    {
      name: "Adnan Rahmat",
      position: "President",
      category: "core",
      color: "saffron",
    },
    {
      name: "Sofia Parveen",
      position: "Vice President",
      category: "core",
      color: "green",
    },
    {
      name: "Aakash Kumar",
      position: "General Secretary",
      category: "core",
      color: "saffron",
    },
    {
      name: "Nikita Jaiswal",
      position: "Treasurer",
      category: "core",
      color: "green",
    },
  ];

  const administration: TeamMember[] = [
    {
      name: "Noor Alam",
      position: "Administration Council President",
      category: "admin",
      color: "saffron",
    },
    {
      name: "Jahira Khatoon",
      position: "Administration Secretary",
      category: "admin",
      color: "green",
    },
  ];

  const spokesperson: TeamMember[] = [
    {
      name: "Md Rahmatullah",
      position: "Spokesperson",
      category: "spokesperson",
      color: "saffron",
    },
  ];

  const advisory: TeamMember[] = [
    {
      name: "Prof. Mritunjay Kumar Yadavendu",
      position: "Advisory Council President",
      category: "advisory",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30 relative overflow-hidden">
      {/* Subtle diagonal grid pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative floating dots */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-saffron-400/40 rounded-full animate-pulse-subtle hidden sm:block" />
      <div className="absolute top-40 right-32 w-2 h-2 bg-india-green-400/40 rounded-full animate-pulse-subtle animation-delay-200 hidden sm:block" />
      <div className="absolute bottom-1/3 left-16 w-2 h-2 bg-saffron-500/30 rounded-full animate-pulse-subtle animation-delay-400 hidden md:block" />
      <div className="absolute top-1/2 right-20 w-2.5 h-2.5 bg-india-green-400/30 rounded-full animate-pulse-subtle animation-delay-600 hidden lg:block" />

      {/* Gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-saffron-200/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-india-green-200/20 rounded-full filter blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-saffron-50 to-india-green-50 border border-saffron-200/50 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" />
              <span className="text-sm font-medium text-slate-700 tracking-wide">
                Our Leadership
              </span>
              <span className="w-2 h-2 rounded-full bg-india-green-400 animate-pulse" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in animation-delay-100">
              <span className="bg-gradient-to-r from-saffron-600 via-slate-800 to-india-green-600 bg-clip-text text-transparent">
                Meet the Team
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
              Dedicated individuals working together to empower youth and create
              lasting positive change in our communities
            </p>

            {/* Decorative accent bar */}
            <div className="flex justify-center gap-1 mt-4 animate-fade-in animation-delay-300">
              <div className="h-1 w-8 rounded-full bg-saffron-500" />
              <div className="h-1 w-4 rounded-full bg-slate-300" />
              <div className="h-1 w-8 rounded-full bg-india-green-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white to-warm-50/50 rounded-3xl border border-saffron-100 overflow-hidden shadow-lg">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-saffron-50 via-white to-india-green-50 px-6 sm:px-8 py-8 sm:py-10 text-center border-b border-saffron-100">
                <Quote className="w-8 sm:w-10 h-8 sm:h-10 text-saffron-400 mx-auto mb-4 opacity-60" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-2">
                  संस्थापक का संदेश
                </h2>
                <p className="text-sm text-slate-600">Founder's Message</p>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Founder Info */}
                  <div className="lg:col-span-1 flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-gradient-to-br from-saffron-100 to-india-green-100 flex items-center justify-center shadow-md">
                        <User className="w-12 sm:w-14 h-12 sm:h-14 text-slate-600" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-500 flex items-center justify-center shadow-md">
                        <Quote className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                        Kafeel Ahmad Azad
                      </h3>
                      <p className="text-sm text-saffron-600 font-medium">
                        संस्थापक
                      </p>
                      <p className="text-xs text-slate-500">
                        Azad Youth Organization
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="lg:col-span-2 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <div className="bg-gradient-to-r from-saffron-50/50 to-india-green-50/50 px-4 sm:px-5 py-3 rounded-2xl border-l-4 border-saffron-300">
                      <p className="font-medium text-slate-800">
                        मेरे प्यारे युवा साथियों,
                      </p>
                    </div>

                    <p className="pl-4 border-l-2 border-slate-200">
                      मेरे लिए देश सबसे पहले आता है। इसी सोच के साथ मैंने आज़ाद
                      यूथ ऑर्गनाइज़ेशन की स्थापना की। हमारा एकमात्र लक्ष्य आप
                      जैसे छात्रों और युवाओं को सशक्त बनाना है, क्योंकि{" "}
                      <span className="font-medium text-saffron-600">
                        आप ही हमारे देश का भविष्य हैं।
                      </span>
                    </p>

                    <p className="pl-4 border-l-2 border-slate-200">
                      मेरा सपना एक ऐसे भारत का है जहाँ हर नागरिक{" "}
                      <span className="font-medium text-india-green-600">
                        परिपक्व लोकतंत्र के मूल्यों
                      </span>{" "}
                      को समझे और जिम्मेदारी से अपना योगदान दे। हम शिक्षा,
                      नैतिकता और वैज्ञानिक सोच के माध्यम से इसी दिशा में काम कर
                      रहे हैं।
                    </p>

                    <div className="bg-gradient-to-r from-saffron-100 to-india-green-100 px-5 sm:px-6 py-4 rounded-2xl text-center border border-saffron-200/50">
                      <p className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">
                        आइए, हम सब मिलकर एक ऐसा सशक्त और जागरूक भारत बनाएं!
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-saffron-600">
                        जय हिंद!
                      </p>
                    </div>

                    {/* Signature */}
                    <div className="pt-4 text-right">
                      <p className="font-semibold text-slate-800">
                        - Kafeel Ahmad Azad
                      </p>
                      <p className="text-sm text-slate-500 italic">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Leadership Team */}
      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Core Team"
            title="Core Leadership"
            subtitle="The driving force behind our mission to empower youth across Bihar"
            titleColor="gradient"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mt-10 sm:mt-12 team-stagger">
            {leadership.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                position={member.position}
                color={member.color}
                image={member.image}
                description={member.description}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Administration Council */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-warm-50/50 to-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Administration"
            title="Administration Council"
            subtitle="Ensuring smooth operations and effective governance"
            titleColor="gradient"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mt-10 sm:mt-12 team-stagger">
            {administration.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                position={member.position}
                color={member.color}
                image={member.image}
                description={member.description}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Spokesperson */}
      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Communications"
            title="Spokesperson"
            subtitle="The voice of our organization"
            titleColor="gradient"
          />

          <div className="grid grid-cols-1 max-w-sm mx-auto mt-10 sm:mt-12 team-stagger">
            {spokesperson.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                position={member.position}
                color={member.color}
                image={member.image}
                description={member.description}
                socialLinks={member.socialLinks}
                size="lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Council */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-warm-50/50 to-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Advisory"
            title="Advisory Council"
            subtitle="Providing strategic guidance and mentorship"
            titleColor="gradient"
          />

          <div className="grid grid-cols-1 max-w-sm mx-auto mt-10 sm:mt-12 team-stagger">
            {advisory.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                position={member.position}
                color={member.color}
                image={member.image}
                description={member.description}
                socialLinks={member.socialLinks}
                size="lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission CTA */}
      <UnifiedCTASection
        title={
          <>
            Be Part of <span className="text-saffron-400">Something</span>{" "}
            <span className="text-india-green-400">Meaningful</span>
          </>
        }
        subtitle="Your skills, time, and passion can help transform lives. Join a community of changemakers dedicated to empowering Bihar's youth and building a brighter future together."
        primaryAction={{
          label: "Join Our Team",
          href: "/register",
          icon: Users,
        }}
        secondaryAction={{
          label: "Support Our Cause",
          href: "/donate",
          icon: Heart,
        }}
        phone="+91 9942495941"
        email="ayoindia1@gmail.com"
      />
    </div>
  );
};

export default OurTeam;
