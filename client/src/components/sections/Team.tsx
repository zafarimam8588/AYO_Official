import { Users, Heart } from "lucide-react";

import { Card } from "../ui/card";
import { useState } from "react";
// Board and Team Members Data
const boardMembers = [
  {
    name: "Arjun Kumar Singh",
    role: "Founder & Chairman",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    description:
      "Visionary leader with 15+ years experience in social work and community development across Bihar. Founded AYO with the mission to transform rural Bihar through youth empowerment.",
    experience: "15+ Years",
    education: "M.A. Social Work",
  },
  {
    name: "Priya Kumari",
    role: "Secretary",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    description:
      "Dynamic organizational strategist passionate about women empowerment and education. Leads policy development and strategic partnerships for sustainable growth.",
    experience: "12+ Years",
    education: "MBA, Development Studies",
  },
  {
    name: "Ramesh Chandra Verma",
    role: "President",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
    description:
      "Experienced administrator driving organizational excellence and community impact. Oversees all operational activities and ensures mission alignment across programs.",
    experience: "18+ Years",
    education: "M.A. Public Administration",
  },
];

const teamMembers = [
  {
    name: "Kavita Devi",
    role: "Program Manager",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    description:
      "Manages day-to-day operations of education and healthcare programs across 50+ villages in Bihar. Expert in project implementation and community engagement.",
    experience: "8+ Years",
    education: "M.Sc. Rural Development",
  },
  {
    name: "Rahul Singh Yadav",
    role: "Field Coordinator",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    description:
      "Coordinates field activities and maintains strong relationships with local communities. Ensures effective program delivery and impact assessment.",
    experience: "6+ Years",
    education: "B.A. Social Sciences",
  },
  {
    name: "Pooja Sinha",
    role: "Communications Manager",
    image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg",
    description:
      "Handles public relations, digital marketing, and stakeholder communications. Creates compelling content to showcase AYO's impact and attract support.",
    experience: "5+ Years",
    education: "M.A. Mass Communication",
  },
  {
    name: "Vikash Kumar",
    role: "Finance Officer",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    description:
      "Manages financial operations, budgeting, and ensures transparent fund utilization. Maintains compliance with regulatory requirements and donor guidelines.",
    experience: "7+ Years",
    education: "M.Com, CA (Pursuing)",
  },
  {
    name: "Anjali Sharma",
    role: "Training Coordinator",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
    description:
      "Designs and implements skill development programs for youth and women. Specializes in vocational training and entrepreneurship development.",
    experience: "4+ Years",
    education: "M.Ed., Vocational Training",
  },
  {
    name: "Manoj Kumar",
    role: "Health Program Officer",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
    description:
      "Oversees mobile health clinics and medical camp operations. Works closely with healthcare professionals to improve rural health access.",
    experience: "9+ Years",
    education: "B.Sc. Public Health",
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
            Passionate leaders and dedicated professionals driving change in
            Bihar
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 lg:mb-10">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-1 shadow-lg border border-orange-200/50">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 ${
                  activeTab === 0
                    ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                Board Members
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 ${
                  activeTab === 1
                    ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                Team Members
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
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto object-cover border-4 border-orange-200 shadow-lg"
                      />
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
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 lg:w-28 lg:h-28 rounded-full mx-auto object-cover border-4 border-green-200 shadow-lg"
                      />
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
