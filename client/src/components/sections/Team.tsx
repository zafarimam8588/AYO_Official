import { User } from "lucide-react";
import { Card } from "../ui/card";
import { useState, useRef, useEffect } from "react";
import { SectionHeader } from "@/components/common";
import { cn } from "@/lib/utils";

// Real Board and Team Members Data from Azad Youth Organization
const boardMembers = [
  {
    name: "Kafeel Ahmad Azad",
    role: "Founder",
    image: "", // Image will come from backend or database
    description:
      "Visionary founder dedicated to youth empowerment and building a mature democracy. Leading the organization with a mission to inspire students and youth to bring positive changes in society.",
    experience: "Founder",
    education: "Social Leadership",
  },
  {
    name: "Adnan Rahmat",
    role: "President",
    image: "", // Image will come from backend or database
    description:
      "Leading the core leadership team with strategic vision and operational excellence. Ensures alignment of organizational activities with our mission of youth empowerment.",
    experience: "President",
    education: "Leadership",
  },
  {
    name: "Sofia Parveen",
    role: "Vice President",
    image: "", // Image will come from backend or database
    description:
      "Supporting leadership initiatives and driving key organizational programs. Passionate about civic awareness, patriotism, and leadership development among youth.",
    experience: "Vice President",
    education: "Administration",
  },
];

const teamMembers = [
  {
    name: "Aakash Kumar",
    role: "General Secretary",
    image: "", // Image will come from backend or database
    description:
      "Manages organizational documentation, coordination, and ensures smooth execution of programs. Key player in education empowerment and scholarship initiatives.",
    experience: "Core Team",
    education: "Management",
  },
  {
    name: "Nikita Jaiswal",
    role: "Treasurer",
    image: "", // Image will come from backend or database
    description:
      "Oversees financial operations, budgeting, and ensures transparent fund utilization for all organizational activities and programs.",
    experience: "Core Team",
    education: "Finance",
  },
  {
    name: "Noor Alam",
    role: "Administration Council President",
    image: "", // Image will come from backend or database
    description:
      "Leads the administration council ensuring effective program implementation and organizational efficiency across all initiatives.",
    experience: "Administration",
    education: "Public Administration",
  },
  {
    name: "Jahira Khatoon",
    role: "Administration Secretary",
    image: "", // Image will come from backend or database
    description:
      "Supports administrative operations and maintains records. Coordinates between different teams for seamless program delivery.",
    experience: "Administration",
    education: "Administration",
  },
  {
    name: "Md Rahmatullah",
    role: "Spokesperson",
    image: "", // Image will come from backend or database
    description:
      "Official voice of the organization, handling public relations, media communications, and representing AYO in various forums and events.",
    experience: "Communications",
    education: "Media & Communication",
  },
  {
    name: "Prof. Mritunjay Kumar Yadavendu",
    role: "Advisory Council President",
    image: "", // Image will come from backend or database
    description:
      "Provides strategic guidance and mentorship to the organization. Brings academic expertise and vision to strengthen our youth empowerment programs.",
    experience: "Advisory",
    education: "Professor",
  },
];

const Team = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30"
    >
      {/* Background pattern using Tailwind */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 153, 51, 0.01) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our People"
          title="Meet Our Team"
          subtitle="Dedicated leaders working together to empower youth and create positive change"
          titleColor="gradient"
        />

        {/* Custom Tabs */}
        <div className="max-w-6xl mx-auto mt-12">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-10 lg:mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-slate-200/50">
              {["Core Leadership", "Extended Team"].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "relative px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300",
                    activeTab === index
                      ? "text-white shadow-md"
                      : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                  )}
                >
                  {activeTab === index && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-saffron-500 to-india-green-500 -z-10" />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative">
            {/* Board Members Tab */}
            {activeTab === 0 && (
              <div
                className={cn(
                  "grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3",
                  isVisible ? "stagger-animation" : "opacity-0"
                )}
              >
                {boardMembers.map((member, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "group p-6 lg:p-8 text-center rounded-3xl",
                      "bg-white/90 backdrop-blur-sm shadow-lg",
                      "border border-saffron-200/50",
                      "hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    )}
                  >
                    {/* Avatar with gradient ring */}
                    <div className="relative mb-6">
                      <div
                        className={cn(
                          "w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto",
                          "bg-gradient-to-br from-saffron-100 to-india-green-100",
                          "flex items-center justify-center",
                          "ring-4 ring-offset-2 ring-saffron-200 shadow-lg"
                        )}
                      >
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-12 h-12 lg:w-14 lg:h-14 text-slate-500" />
                        )}
                      </div>

                      {/* Role badge */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r from-saffron-500 to-saffron-600">
                        Leadership
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-1 mt-2">
                      {member.name}
                    </h3>
                    <p className="text-saffron-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {member.description}
                    </p>

                    {/* Info footer */}
                    <div className="flex justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                      <div className="text-center">
                        <span className="font-semibold block text-slate-700">
                          Experience
                        </span>
                        {member.experience}
                      </div>
                      <div className="w-px bg-slate-200" />
                      <div className="text-center">
                        <span className="font-semibold block text-slate-700">
                          Education
                        </span>
                        {member.education}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Team Members Tab */}
            {activeTab === 1 && (
              <div
                className={cn(
                  "grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3",
                  isVisible ? "stagger-animation" : "opacity-0"
                )}
              >
                {teamMembers.map((member, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "group p-6 lg:p-8 text-center rounded-3xl",
                      "bg-white/90 backdrop-blur-sm shadow-lg",
                      "border border-india-green-200/50",
                      "hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    )}
                  >
                    {/* Avatar with gradient ring */}
                    <div className="relative mb-6">
                      <div
                        className={cn(
                          "w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto",
                          "bg-gradient-to-br from-india-green-100 to-saffron-100",
                          "flex items-center justify-center",
                          "ring-4 ring-offset-2 ring-india-green-200 shadow-lg"
                        )}
                      >
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-12 h-12 lg:w-14 lg:h-14 text-slate-500" />
                        )}
                      </div>

                      {/* Role badge */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md bg-gradient-to-r from-india-green-500 to-india-green-600">
                        Team
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-1 mt-2">
                      {member.name}
                    </h3>
                    <p className="text-india-green-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {member.description}
                    </p>

                    {/* Info footer */}
                    <div className="flex justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                      <div className="text-center">
                        <span className="font-semibold block text-slate-700">
                          Experience
                        </span>
                        {member.experience}
                      </div>
                      <div className="w-px bg-slate-200" />
                      <div className="text-center">
                        <span className="font-semibold block text-slate-700">
                          Education
                        </span>
                        {member.education}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
