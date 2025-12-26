import { Users, Heart, User } from "lucide-react";

import { Card } from "../ui/card";
import { useState } from "react";

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
  return (
    <div
      className="py-12 lg:py-16 relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 153, 51, 0.03) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(19, 136, 8, 0.03) 100%)",
        backgroundImage: `
            linear-gradient(0deg, rgba(255, 153, 51, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px)
          `,
        backgroundSize: "50px 50px, 50px 50px, 100px 100px",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Dedicated leaders working together to empower youth and create
            positive change
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 lg:mb-10">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-1 shadow-lg border border-orange-200/50">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 cursor-pointer ${
                  activeTab === 0
                    ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                Core Leadership
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 cursor-pointer ${
                  activeTab === 1
                    ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                Extended Team
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative">
            {/* Board Members Tab */}
            {activeTab === 0 && (
              <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                {boardMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="p-6 lg:p-8 text-center shadow-lg border border-orange-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(255, 153, 51, 0.04) 0%, transparent 100%)",
                    }}
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto bg-gradient-to-br from-orange-100 to-green-100 border-4 border-orange-200 shadow-lg flex items-center justify-center">
                        <User className="w-12 h-12 lg:w-14 lg:h-14 text-slate-600" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-green-500 p-2 rounded-full shadow-md">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>

                    <div className="flex justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                      <div>
                        <span className="font-semibold">Experience:</span>
                        <br />
                        {member.experience}
                      </div>
                      <div>
                        <span className="font-semibold">Education:</span>
                        <br />
                        {member.education}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Team Members Tab */}
            {activeTab === 1 && (
              <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                {teamMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="p-6 lg:p-8 text-center shadow-lg border border-green-200/50 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(19, 136, 8, 0.04) 0%, transparent 100%)",
                    }}
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto bg-gradient-to-br from-green-100 to-orange-100 border-4 border-green-200 shadow-lg flex items-center justify-center">
                        <User className="w-12 h-12 lg:w-14 lg:h-14 text-slate-600" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-orange-500 p-2 rounded-full shadow-md">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>

                    <div className="flex justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                      <div>
                        <span className="font-semibold">Experience:</span>
                        <br />
                        {member.experience}
                      </div>
                      <div>
                        <span className="font-semibold">Education:</span>
                        <br />
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
    </div>
  );
};

export default Team;
