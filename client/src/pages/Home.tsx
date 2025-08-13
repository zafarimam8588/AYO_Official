import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Globe, Star, CheckCircle, Award } from "lucide-react";
const Home = () => {
  return (
    <>
      <main
        className=" px-4 sm:px-6 lg:px-8 py-12"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.025) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.02) 0%, transparent 50%),
            linear-gradient(0deg, rgba(34, 197, 94, 0.005) 50%, transparent 50%),
            linear-gradient(90deg, rgba(16, 185, 129, 0.005) 50%, transparent 50%)
          `,
          backgroundSize: "150px 150px, 100px 100px, 30px 30px, 30px 30px",
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-800 via-emerald-700 to-lime-600 bg-clip-text text-transparent">
              Build Modern
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-lime-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Making a difference in communities around the world
          </p>
        </div>
      </main>
      <div className="min-h-screen bg-green-50">
        {/* Hero Section */}
        <div
          className="relative bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 py-14 overflow-hidden"
          style={{
            backgroundImage: `Maria Santos
                radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.04) 0%, transparent 50%),
                linear-gradient(45deg, rgba(34, 197, 94, 0.02) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)
              `,
            backgroundSize:
              "300px 300px, 250px 250px, 200px 200px, 60px 60px, 60px 60px",
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500 p-3 rounded-full shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-green-800">
                    Hope Foundation
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight">
                  Building Hope,
                  <span className="text-green-600"> Transforming Lives</span>
                </h1>

                <p className="text-xl text-green-700 leading-relaxed max-w-2xl">
                  Join us in our mission to empower communities, provide
                  education, healthcare, and create sustainable opportunities
                  for those who need it most. Together, we can make a lasting
                  difference.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundImage: `
                          linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                          linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%)
                        `,
                      backgroundSize: "20px 20px",
                    }}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Get Involved
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      100K+
                    </div>
                    <div className="text-sm text-green-700">Lives Changed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">25</div>
                    <div className="text-sm text-green-700">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">15+</div>
                    <div className="text-sm text-green-700">Years Impact</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl pt-16"
                  style={{
                    backgroundImage: `
                        radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                        linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)
                      `,
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg"
                    alt="Hope Foundation helping communities"
                    width={500}
                    height={600}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 p-2 rounded-full">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        500+
                      </div>
                      <div className="text-xs text-gray-600">Volunteers</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-500 p-2 rounded-full">
                      <Globe className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-600">
                        150
                      </div>
                      <div className="text-xs text-gray-600">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div
          className="py-12 bg-white relative"
          style={{
            backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.04) 0%, transparent 60%),
                radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03) 0%, transparent 60%),
                linear-gradient(90deg, rgba(20, 184, 166, 0.02) 1px, transparent 1px),
                linear-gradient(0deg, rgba(34, 197, 94, 0.02) 1px, transparent 1px)
              `,
            backgroundSize: "400px 400px, 300px 300px, 80px 80px, 80px 80px",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative pt-16 hidden sm:flex">
                <img
                  src="https://images.pexels.com/photos/2467506/pexels-photo-2467506.jpeg"
                  alt="Our team working with communities"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-xl w-full object-cover border border-green-100"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-1 bg-green-500 rounded"></div>
                  <span className="text-green-600 font-semibold uppercase tracking-wide">
                    About Us
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Empowering Communities for
                  <span className="text-green-600"> Over 15 Years</span>
                </h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Hope Foundation was born from a simple belief: every person
                  deserves access to basic necessities, education, and
                  opportunities to thrive. What started as a small community
                  initiative has grown into a global movement, touching lives
                  across 25 countries.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Sustainable Impact
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Long-term solutions that create lasting change
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Community-Driven
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Programs designed with local communities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Transparent
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Open reporting on all our activities and impact
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Global Reach
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Working across continents to maximize impact
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Section */}
        <div
          className="py-20 bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 relative"
          style={{
            backgroundImage: `
                radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 50% 10%, rgba(20, 184, 166, 0.04) 0%, transparent 50%),
                linear-gradient(135deg, rgba(34, 197, 94, 0.02) 1px, transparent 1px)
              `,
            backgroundSize: "250px 250px, 200px 200px, 300px 300px, 50px 50px",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-1 bg-green-500 rounded"></div>
                <span className="text-green-600 font-semibold uppercase tracking-wide">
                  Our Programs
                </span>
                <div className="w-12 h-1 bg-green-500 rounded"></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Creating Change Through Action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive programs address the root causes of poverty
                and inequality, creating sustainable solutions for communities
                worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Education Program */}
              <Card
                className="p-8 text-center shadow-xl border border-green-200 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  backgroundImage: `
                      radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 60%),
                      linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, transparent 100%)
                    `,
                }}
              >
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Education & Literacy
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Building schools, training teachers, and providing educational
                  resources to ensure every child has access to quality
                  education and a brighter future.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Schools Built</span>
                    <span className="font-bold text-green-600">50+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Teachers Trained
                    </span>
                    <span className="font-bold text-green-600">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Students Enrolled
                    </span>
                    <span className="font-bold text-green-600">15,000+</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white bg-transparent"
                >
                  Learn More
                </Button>
              </Card>

              {/* Healthcare Program */}
              <Card
                className="p-8 text-center shadow-xl border border-emerald-200 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  backgroundImage: `
                      radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 60%),
                      linear-gradient(45deg, rgba(34, 197, 94, 0.03) 0%, transparent 100%)
                    `,
                }}
              >
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Healthcare Access
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Establishing clinics, training healthcare workers, and
                  providing essential medical services to underserved
                  communities around the world.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Health Clinics
                    </span>
                    <span className="font-bold text-emerald-600">25+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Healthcare Workers
                    </span>
                    <span className="font-bold text-emerald-600">100+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Patients Treated
                    </span>
                    <span className="font-bold text-emerald-600">75,000+</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white bg-transparent"
                >
                  Learn More
                </Button>
              </Card>

              {/* Economic Development */}
              <Card
                className="p-8 text-center shadow-xl border border-teal-200 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  backgroundImage: `
                      radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.05) 0%, transparent 60%),
                      linear-gradient(90deg, rgba(34, 197, 94, 0.03) 0%, transparent 100%)
                    `,
                }}
              >
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Economic Development
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Supporting small businesses, providing microfinance, and
                  creating sustainable income opportunities for families and
                  communities.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Businesses Supported
                    </span>
                    <span className="font-bold text-teal-600">1,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Microloans Provided
                    </span>
                    <span className="font-bold text-teal-600">$2M+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Jobs Created</span>
                    <span className="font-bold text-teal-600">5,000+</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white bg-transparent"
                >
                  Learn More
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div
          className="py-2 bg-white relative"
          style={{
            backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
                linear-gradient(45deg, rgba(20, 184, 166, 0.01) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(34, 197, 94, 0.01) 1px, transparent 1px)
              `,
            backgroundSize: "300px 300px, 250px 250px, 60px 60px, 60px 60px",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-1 bg-green-500 rounded"></div>
                <span className="text-green-600 font-semibold uppercase tracking-wide">
                  Testimonials
                </span>
                <div className="w-12 h-1 bg-green-500 rounded"></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Stories of Hope and Change
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from the communities and individuals whose lives have been
                transformed through our programs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card
                className="p-6 shadow-xl border border-green-100 bg-white/90 backdrop-blur-sm rounded-2xl"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.06) 0%, transparent 50%)",
                }}
              >
                <p className="text-gray-800 text-lg mb-6 leading-relaxed italic">
                  “Hope Foundation built a school in our village. Now my three
                  children can get an education without walking 10 kilometers
                  every day. This has changed our entire community's future.”
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Maria Santos"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-green-300 shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">
                      Maria Santos
                    </h4>
                    <p className="text-sm text-gray-600">Parent, Guatemala</p>
                  </div>
                </div>
              </Card>

              {/* Testimonial 2 */}
              <Card
                className="p-6 shadow-xl border border-green-100 bg-white/90 backdrop-blur-sm rounded-2xl"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.06) 0%, transparent 50%)",
                }}
              >
                <p className="text-gray-800 text-lg mb-6 leading-relaxed italic">
                  “Hope Foundation built a school in our village. Now my three
                  children can get an education without walking 10 kilometers
                  every day. This has changed our entire community's future.”
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Maria Santos"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-green-300 shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">
                      Maria Santos
                    </h4>
                    <p className="text-sm text-gray-600">Parent, Guatemala</p>
                  </div>
                </div>
              </Card>

              {/* Testimonial 3 */}
              <Card
                className="p-6 shadow-xl border border-green-100 bg-white/90 backdrop-blur-sm rounded-2xl"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.06) 0%, transparent 50%)",
                }}
              >
                <p className="text-gray-800 text-lg mb-6 leading-relaxed italic">
                  “Hope Foundation built a school in our village. Now my three
                  children can get an education without walking 10 kilometers
                  every day. This has changed our entire community's future.”
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Maria Santos"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-green-300 shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">
                      Maria Santos
                    </h4>
                    <p className="text-sm text-gray-600">Parent, Guatemala</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default Home;
