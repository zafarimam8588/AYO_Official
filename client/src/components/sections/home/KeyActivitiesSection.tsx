import { Card } from "@/components/ui/card";
import {
  Calendar,
  GraduationCap,
  Landmark,
  TreePine,
  Scale,
  Droplet,
  BookOpen,
  Flag,
} from "lucide-react";

const KeyActivitiesSection = () => {
  const activities = [
    {
      icon: Calendar,
      title: "Gandhi Jayanti Celebration",
      description:
        "Annual programs including cleanliness drives, tree plantation, and cultural events celebrating Mahatma Gandhi's ideals.",
      color: "orange",
    },
    {
      icon: GraduationCap,
      title: "Scholarship Program",
      description:
        "Financial support for meritorious students to continue their education and achieve their dreams.",
      color: "green",
    },
    {
      icon: Landmark,
      title: "Mature Democracy Awareness",
      description:
        "Spreading awareness about the importance of democratic values and citizen participation in governance.",
      color: "orange",
    },
    {
      icon: TreePine,
      title: "Environmental Protection",
      description:
        "Tree plantation and cleanliness drives working towards protecting and preserving our environment.",
      color: "green",
    },
    {
      icon: Scale,
      title: "Social Justice",
      description:
        "Standing up for social justice and raising voices for the rights of marginalized communities.",
      color: "orange",
    },
    {
      icon: Droplet,
      title: "Blood Donation Camps",
      description:
        "Organizing blood donation camps to support healthcare and emergency medical needs in communities.",
      color: "green",
    },
    {
      icon: BookOpen,
      title: "Education Awareness",
      description:
        "Conducting programs to spread awareness about the importance of education and higher learning.",
      color: "orange",
    },
    {
      icon: Flag,
      title: "Independence Day Celebration",
      description:
        "Annual events featuring flag hoisting, cultural programs, and patriotic songs to celebrate our nation.",
      color: "green",
    },
  ];

  return (
    <div
      className="py-16 sm:py-20 relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 153, 51, 0.03) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(19, 136, 8, 0.03) 100%)",
        backgroundImage: `
          linear-gradient(135deg, rgba(255, 153, 51, 0.015) 1px, transparent 1px),
          linear-gradient(-135deg, rgba(19, 136, 8, 0.015) 1px, transparent 1px),
          linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(19, 136, 8, 0.008) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px, 50px 50px, 100px 100px, 100px 100px",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-1 bg-orange-500 rounded"></div>
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold uppercase tracking-wide text-sm sm:text-base">
              What We Do
            </span>
            <div className="w-12 h-1 bg-green-500 rounded"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Key Activities
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From Gandhi Jayanti celebrations to education awareness programs, we
            organize various initiatives throughout the year to empower youth
            and serve communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Card
                key={index}
                className={`p-6 shadow-lg border bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl ${
                  activity.color === "orange"
                    ? "border-orange-200/50 hover:border-orange-300"
                    : "border-green-200/50 hover:border-green-300"
                }`}
                style={{
                  backgroundImage: `
                    linear-gradient(135deg, ${
                      activity.color === "orange"
                        ? "rgba(255, 153, 51, 0.05)"
                        : "rgba(19, 136, 8, 0.05)"
                    } 0%, transparent 100%)
                  `,
                }}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md bg-gradient-to-br ${
                    activity.color === "orange"
                      ? "from-orange-500 to-orange-600"
                      : "from-green-500 to-green-600"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 text-center">
                  {activity.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-center">
                  {activity.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-lg sm:text-xl text-slate-700 mb-6 max-w-2xl mx-auto italic">
            "We believe that youth are the future of the nation. We are
            committed to empowering them and inspiring them to bring positive
            changes in society."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Learn More About Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyActivitiesSection;
