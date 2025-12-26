import { Mail, Phone } from "lucide-react";
import { SupportOurMissionBtn, VolunteerNowBtn } from "../misc/Buttons";

const ReadyToMakeDifference = () => {
  return (
    <>
      <div
        className="py-2 relative section-animate"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 153, 51, 0.05) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(19, 136, 8, 0.05) 100%)",
          backgroundImage: `
                linear-gradient(0deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
              `,
          backgroundSize: "30px 30px, 30px 30px",
        }}
      ></div>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-slate-800">Ready to Make a</span>
            <span className="block bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              Difference in Bihar?
            </span>
          </h2>

          <p className="text-xl text-slate-600 mb-8">
            Join thousands of volunteers and supporters who are creating
            positive change across Bihar's communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <SupportOurMissionBtn />
            <VolunteerNowBtn />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917836950052"
              className="flex items-center justify-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <Phone className="h-4 w-4" />
              +91 7836950052
            </a>
            <a
              href="mailto:info@azadyouth.org"
              className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <Mail className="h-4 w-4" />
              info@azadyouth.org
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadyToMakeDifference;
