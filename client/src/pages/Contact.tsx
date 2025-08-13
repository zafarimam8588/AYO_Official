import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Heart,
  User,
  MessageSquare,
} from "lucide-react";
import { DonateBtn, VolunteerBtn } from "@/components/misc/Buttons";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-green-50 relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.1) 2px, transparent 0),
          radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.08) 1px, transparent 0)
        `,
        backgroundSize: "100px 100px, 50px 50px",
      }}
    >
      {/* Header Section */}
      <div
        className="bg-green-50 text-green-800 py-16 relative overflow-hidden"
        style={{
          backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.04) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 40%),
      linear-gradient(90deg, rgba(34, 197, 94, 0.02) 1px, transparent 1px),
      linear-gradient(0deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)
    `,
          backgroundSize: "200px 200px, 150px 150px, 40px 40px, 40px 40px",
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-green-800">
              Get In Touch
            </h1>
          </div>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            {
              "We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            }
          </p>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-6xl mx-auto shadow-xl border border-green-200 overflow-hidden bg-white backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Image and Info */}
              <div
                className="relative  p-8 lg:p-12 text-green-800"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
                    linear-gradient(90deg, rgba(34, 197, 94, 0.02) 50%, transparent 50%)
                  `,
                  backgroundSize: "100px 100px, 80px 80px, 20px 20px",
                }}
              >
                <div className="absolute inset-0 bg-white/20"></div>
                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/1558690/pexels-photo-1558690.jpeg"
                        alt="NGO volunteers helping community"
                        width={400}
                        height={300}
                        className="rounded-xl shadow-lg mb-6 w-full object-cover border-2 border-white/50"
                      />
                      <div className="absolute inset-0 bg-green-200/20 rounded-xl"></div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mb-6 text-green-800">
                    {"Let's Make a Difference Together"}
                  </h2>
                  <p className="text-green-700 mb-8 text-lg leading-relaxed">
                    Join us in our mission to create positive change in
                    communities. Whether you want to volunteer, donate, or
                    partner with us, {"we're"} here to help you get involved.
                  </p>

                  <div className="space-y-6">
                    <div
                      className="flex items-center gap-4 bg-white/40 p-4 rounded-lg backdrop-blur-sm border border-white/30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
                      }}
                    >
                      <div className="bg-green-500 p-3 rounded-full shadow-md">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Phone</p>
                        <p className="text-green-600">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-4 bg-white/40 p-4 rounded-lg backdrop-blur-sm border border-white/30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                      }}
                    >
                      <div className="bg-emerald-500 p-3 rounded-full shadow-md">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Email</p>
                        <p className="text-green-600">contact@ngohelp.org</p>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-4 bg-white/40 p-4 rounded-lg backdrop-blur-sm border border-white/30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
                      }}
                    >
                      <div className="bg-teal-500 p-3 rounded-full shadow-md">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Address</p>
                        <p className="text-green-600">
                          123 Hope Street, Community City, CC 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div
                className="p-8 lg:p-12 bg-white relative"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
                    linear-gradient(90deg, rgba(34, 197, 94, 0.02) 50%, transparent 50%)
                  `,
                  backgroundSize: "100px 100px, 80px 80px, 20px 20px",
                }}
              >
                <div className="max-w-md mx-auto relative z-10">
                  <div className="text-center mb-8">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 bg-green-400 rounded-full mb-4 shadow-lg relative"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                          linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%)
                        `,
                      }}
                    >
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Send us a Message
                    </h3>
                    <p className="text-gray-600">
                      {"We'll get back to you within 24 hours"}
                    </p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-gray-700 font-medium flex items-center gap-2"
                        >
                          <User className="h-4 w-4 text-green-500" />
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="border border-green-200 focus:border-green-400 focus:ring-green-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg h-12 relative"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, rgba(34, 197, 94, 0.01) 0%, rgba(255, 255, 255, 1) 100%)",
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-gray-700 font-medium flex items-center gap-2"
                        >
                          <User className="h-4 w-4 text-green-500" />
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="border border-green-200 focus:border-green-400 focus:ring-green-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg h-12"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, rgba(34, 197, 94, 0.01) 0%, rgba(255, 255, 255, 1) 100%)",
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-green-500" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="border border-green-200 focus:border-green-400 focus:ring-green-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg h-12"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(34, 197, 94, 0.01) 0%, rgba(255, 255, 255, 1) 100%)",
                        }}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-gray-700 font-medium flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4 text-green-500" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="border border-green-200 focus:border-green-400 focus:ring-green-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg h-12"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(34, 197, 94, 0.01) 0%, rgba(255, 255, 255, 1) 100%)",
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-gray-700 font-medium flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        className="border border-green-200 focus:border-green-400 focus:ring-green-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg h-12"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(34, 197, 94, 0.01) 0%, rgba(255, 255, 255, 1) 100%)",
                        }}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-gray-700 font-medium flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        className="border border-green-200 focus:border-green-400 focus:ring-green-300 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-h-[120px] resize-none rounded-lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(34, 197, 94, 0.01) 0%, rgba(255, 255, 255, 1) 100%)",
                        }}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-green-300 hover:border-green-400 h-14 relative overflow-hidden"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                          linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%),
                          linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%)
                        `,
                        backgroundSize: "20px 20px",
                        backgroundPosition:
                          "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>

                  <div
                    className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm relative"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          90deg,
                          rgba(34, 197, 94, 0.03),
                          rgba(34, 197, 94, 0.03) 2px,
                          transparent 2px,
                          transparent 20px
                        ),
                        repeating-linear-gradient(
                          0deg,
                          rgba(16, 185, 129, 0.02),
                          rgba(16, 185, 129, 0.02) 2px,
                          transparent 2px,
                          transparent 20px
                        )
                      `,
                    }}
                  >
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="bg-green-400 p-2 rounded-full">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-green-800 font-medium">
                          Quick Response
                        </p>
                        <p className="text-sm text-green-700">
                          For urgent matters, please call us directly at +1
                          (555) 123-4567
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action Section */}
      <div
        className="bg-green-100 text-green-800 py-16 relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
            linear-gradient(0deg, rgba(34, 197, 94, 0.02) 50%, transparent 50%),
            linear-gradient(90deg, rgba(16, 185, 129, 0.02) 50%, transparent 50%)
          `,
          backgroundSize: "150px 150px, 100px 100px, 30px 30px, 30px 30px",
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Join thousands of volunteers and donors who are already making a
            difference in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <VolunteerBtn classStyle="" />
            <DonateBtn classStyle="" />
          </div>
        </div>
      </div>
    </div>
  );
}
