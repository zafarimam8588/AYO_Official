import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Send,
} from "lucide-react";

const ContactUsFormSection = () => {
  return (
    <div className="container mx-auto px-4 py-2">
      <Card className="max-w-7xl mx-auto shadow-2xl border border-orange-200/50 overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Contact Information */}
            <div
              className="relative p-8 lg:p-12"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 153, 51, 0.03) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(19, 136, 8, 0.03) 100%)",
                backgroundImage: `
                    linear-gradient(45deg, rgba(255, 153, 51, 0.01) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(19, 136, 8, 0.01) 1px, transparent 1px),
                    linear-gradient(0deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px)
                  `,
                backgroundSize: "60px 60px, 60px 60px, 80px 80px",
              }}
            >
              <div className="relative z-10">
                {/* Hero Image */}
                <div className="mb-8 relative group">
                  <img
                    src="https://images.pexels.com/photos/8422085/pexels-photo-8422085.jpeg"
                    alt="Azad Youth Organisation team helping Bihar communities"
                    className="rounded-2xl shadow-xl w-full h-64 object-cover border-2 border-orange-200/50 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl"></div>

                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-lg border border-green-200/50">
                    <div className="text-center">
                      <div className="text-lg font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                        24/7
                      </div>
                      <div className="text-xs text-slate-600">Available</div>
                    </div>
                  </div>
                </div>

                {/* Title and Description */}
                <div className="mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                      Let's Transform Bihar Together
                    </span>
                  </h2>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    Join us in our mission to empower Bihar's youth and
                    communities. Whether you want to volunteer, donate, partner
                    with us, or learn more about our programs, we're here to
                    connect with you.
                  </p>
                </div>

                {/* Contact Information Cards */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/60 backdrop-blur p-4 rounded-2xl border border-orange-200/50 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Phone</p>
                      <p className="text-slate-600">+91 98765 43210</p>
                      <p className="text-xs text-slate-500">
                        Available 9 AM - 6 PM (IST)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/60 backdrop-blur p-4 rounded-2xl border border-green-200/50 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Email</p>
                      <p className="text-slate-600">contact@azadyouth.org</p>
                      <p className="text-xs text-slate-500">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/60 backdrop-blur p-4 rounded-2xl border border-slate-200/50 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-3 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Address</p>
                      <p className="text-slate-600">123 Gandhi Marg, Patna</p>
                      <p className="text-slate-600">Bihar 800001, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/60 backdrop-blur p-4 rounded-2xl border border-orange-200/50 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="bg-gradient-to-br from-orange-500 to-green-500 p-3 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        Office Hours
                      </p>
                      <p className="text-slate-600">
                        Monday - Saturday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-slate-600">
                        Sunday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div
              className="p-8 lg:p-12 relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(19, 136, 8, 0.02) 100%)",
                backgroundImage: `
                    linear-gradient(45deg, rgba(255, 153, 51, 0.005) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(19, 136, 8, 0.005) 1px, transparent 1px)
                  `,
                backgroundSize: "40px 40px, 40px 40px",
              }}
            >
              <div className="max-w-lg mx-auto relative z-10">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-green-500 rounded-2xl mb-4 shadow-lg relative overflow-hidden group">
                    <MessageSquare className="h-8 w-8 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                    Send us a Message
                  </h3>
                  <p className="text-slate-600">
                    We'll get back to you within 24 hours
                  </p>
                </div>

                {/* Contact Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-slate-700 font-medium flex items-center gap-2"
                      >
                        <User className="h-4 w-4 text-orange-500" />
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="border-2 border-orange-200/50 focus:border-orange-400 focus:ring-orange-300/50 bg-white shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 rounded-xl h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-slate-700 font-medium flex items-center gap-2"
                      >
                        <User className="h-4 w-4 text-green-500" />
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="border-2 border-green-200/50 focus:border-green-400 focus:ring-green-300/50 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 rounded-xl h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 text-orange-500" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="border-2 border-orange-200/50 focus:border-orange-400 focus:ring-orange-300/50 bg-white shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 rounded-xl h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-green-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="border-2 border-green-200/50 focus:border-green-400 focus:ring-green-300/50 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 rounded-xl h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4 text-slate-500" />
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What would you like to discuss?"
                      className="border-2 border-slate-200/50 focus:border-slate-400 focus:ring-slate-300/50 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 rounded-xl h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4 text-slate-500" />
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about how you'd like to get involved with our mission..."
                      className="border-2 border-slate-200/50 focus:border-slate-400 focus:ring-slate-300/50 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 min-h-[130px] resize-none rounded-xl"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-14 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Send className="h-5 w-5 mr-2 relative z-10" />
                    <span className="relative z-10">Send Message</span>
                  </Button>
                </form>

                {/* Quick Contact Note */}
                <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200/50 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="bg-gradient-to-br from-orange-500 to-green-500 p-2 rounded-xl shadow-sm">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-1">
                        Need Immediate Assistance?
                      </p>
                      <p className="text-sm text-slate-700">
                        For urgent matters or volunteer emergencies, please call
                        us directly at{" "}
                        <span className="font-medium text-orange-600">
                          +91 98765 43210
                        </span>
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
  );
};

export default ContactUsFormSection;
