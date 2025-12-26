import { User, Mail, Phone, Quote } from "lucide-react";

const OurTeam = () => {
  const leadership = [
    {
      name: "Adnan Rahmat",
      position: "President",
      category: "core",
      color: "orange",
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
      color: "orange",
    },
    {
      name: "Nikita Jaiswal",
      position: "Treasurer",
      category: "core",
      color: "green",
    },
  ];

  const administration = [
    {
      name: "Noor Alam",
      position: "Administration Council President",
      category: "admin",
      color: "orange",
    },
    {
      name: "Jahira Khatoon",
      position: "Administration Secretary",
      category: "admin",
      color: "green",
    },
  ];

  const spokesperson = [
    {
      name: "Md Rahmatullah",
      position: "Spokesperson",
      category: "spokesperson",
      color: "orange",
    },
  ];

  const advisory = [
    {
      name: "Prof. Mritunjay Kumar Yadavendu",
      position: "Advisory Council President",
      category: "advisory",
      color: "green",
    },
  ];

  const TeamCard = ({ member }: { member: any }) => (
    <div
      className={`group bg-white/60 backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 hover:bg-white hover:shadow-xl border border-slate-100 ${
        member.color === "orange"
          ? "hover:border-orange-200"
          : "hover:border-green-200"
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar with subtle gradient */}
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
              member.color === "orange"
                ? "bg-gradient-to-br from-orange-50 to-orange-100 group-hover:from-orange-100 group-hover:to-orange-200"
                : "bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200"
            }`}
          >
            <User
              className={`w-10 h-10 transition-colors duration-500 ${
                member.color === "orange"
                  ? "text-orange-500 group-hover:text-orange-600"
                  : "text-green-500 group-hover:text-green-600"
              }`}
            />
          </div>
          {/* Decorative ring */}
          <div
            className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              member.color === "orange"
                ? "ring-2 ring-orange-200 ring-offset-2"
                : "ring-2 ring-green-200 ring-offset-2"
            }`}
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
          {member.name}
        </h3>

        {/* Position with lighter styling */}
        <span
          className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-500 ${
            member.color === "orange"
              ? "text-orange-600 bg-orange-50 group-hover:bg-orange-100"
              : "text-green-600 bg-green-50 group-hover:bg-green-100"
          }`}
        >
          {member.position}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Subtle top accent */}
      <div className="h-0.5 bg-gradient-to-r from-orange-200 via-slate-100 to-green-200" />

      {/* Hero Section - Lighter and more spacious */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Subtle badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-green-50 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-sm font-medium text-slate-700 tracking-wide">
                Our Leadership
              </span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                Meet the Team
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Dedicated individuals working together to empower youth and create
              lasting positive change in our communities
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Message Section - Modern and Light */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              {/* Subtle header */}
              <div className="relative bg-gradient-to-r from-orange-50 via-slate-50 to-green-50 px-8 py-10 text-center border-b border-slate-100">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 via-slate-200 to-green-300" />
                <Quote className="w-10 h-10 text-orange-400 mx-auto mb-4 opacity-60" />
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
                  संस्थापक का संदेश
                </h2>
                <p className="text-sm text-slate-600">Founder's Message</p>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-12">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Founder Info - Minimal */}
                  <div className="lg:col-span-1 flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
                        <User className="w-14 h-14 text-slate-600" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
                        <Quote className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-slate-800">
                        Kafeel Ahmad Azad
                      </h3>
                      <p className="text-sm text-orange-600 font-medium">
                        संस्थापक
                      </p>
                      <p className="text-xs text-slate-500">
                        Azad Youth Organization
                      </p>
                    </div>
                  </div>

                  {/* Message - Clean typography */}
                  <div className="lg:col-span-2 space-y-5 text-base text-slate-700 leading-relaxed">
                    <div className="bg-gradient-to-r from-orange-50/50 to-green-50/50 px-5 py-3 rounded-2xl border-l-3 border-orange-300">
                      <p className="font-medium text-slate-800">
                        मेरे प्यारे युवा साथियों,
                      </p>
                    </div>

                    <p className="pl-4 border-l-2 border-slate-200">
                      मेरे लिए देश सबसे पहले आता है। इसी सोच के साथ मैंने आज़ाद
                      यूथ ऑर्गनाइज़ेशन की स्थापना की। हमारा एकमात्र लक्ष्य आप
                      जैसे छात्रों और युवाओं को सशक्त बनाना है, क्योंकि{" "}
                      <span className="font-medium text-orange-600">
                        आप ही हमारे देश का भविष्य हैं।
                      </span>
                    </p>

                    <p className="pl-4 border-l-2 border-slate-200">
                      मेरा सपना एक ऐसे भारत का है जहाँ हर नागरिक{" "}
                      <span className="font-medium text-green-600">
                        परिपक्व लोकतंत्र के मूल्यों
                      </span>{" "}
                      को समझे और जिम्मेदारी से अपना योगदान दे। हम शिक्षा,
                      नैतिकता और वैज्ञानिक सोच के माध्यम से इसी दिशा में काम कर
                      रहे हैं।
                    </p>

                    <div className="bg-gradient-to-r from-orange-100 to-green-100 px-6 py-4 rounded-2xl text-center border border-orange-200/50">
                      <p className="font-semibold text-slate-800 mb-1">
                        आइए, हम सब मिलकर एक ऐसा सशक्त और जागरूक भारत बनाएं!
                      </p>
                      <p className="text-xl font-bold text-orange-600">
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
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200">
              <span className="text-sm font-medium text-orange-600">
                Core Team
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Core Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {leadership.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Administration Council */}
      <section className="py-16 sm:py-20 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 border border-green-200">
              <span className="text-sm font-medium text-green-600">
                Administration
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Administration Council
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {administration.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Spokesperson */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200">
              <span className="text-sm font-medium text-orange-600">
                Communications
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Spokesperson
            </h2>
          </div>

          <div className="grid grid-cols-1 max-w-sm mx-auto">
            {spokesperson.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Council */}
      <section className="py-16 sm:py-20 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 border border-green-200">
              <span className="text-sm font-medium text-green-600">
                Advisory
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Advisory Council
            </h2>
          </div>

          <div className="grid grid-cols-1 max-w-sm mx-auto">
            {advisory.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA - Modern Light Style */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/80 border border-slate-200 mb-6">
              <span className="text-sm font-medium text-slate-700">
                Get Involved
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Join Our Mission
            </h2>

            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Be part of the change. Connect with us to learn how you can
              contribute to empowering youth and building a better tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </a>
              <a
                href="tel:+917836950052"
                className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 transition-all duration-300 border border-slate-200 hover:border-slate-300"
              >
                <Phone className="w-5 h-5" />
                +91 7836950052
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-orange-200 via-slate-100 to-green-200" />
    </div>
  );
};

export default OurTeam;
