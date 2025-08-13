import JoinOurMission from "@/components/sections/home/JoinOurMission";
import { Card } from "@/components/ui/card";
import { Heart, Users, Globe, Target, Eye, Handshake } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div
      className="min-h-screen bg-green-50 relative overflow-x-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.08) 2px, transparent 0),
          radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.06) 1px, transparent 0)
        `,
        backgroundSize: "100px 100px, 50px 50px",
      }}
    >
      {/* Hero Section */}
      <div
        className="bg-green-50 text-green-800 py-20 relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
            linear-gradient(90deg, rgba(34, 197, 94, 0.02) 1px, transparent 1px),
            linear-gradient(0deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "250px 250px, 200px 200px, 50px 50px, 50px 50px",
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="h-10 w-10 text-green-500 hidden lg:flex" />
            <h1 className="text-5xl md:text-6xl font-bold text-green-800">
              About Hope Foundation
            </h1>
          </div>
          <p className="text-2xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Empowering communities, transforming lives, and building a better
            tomorrow for everyone, one step at a time.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="relative mt-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.04) 0%, transparent 60%),
                linear-gradient(45deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: "200px 200px, 30px 30px",
            }}
          >
            <img
              src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg"
              alt="Our story - volunteers working together"
              width={600}
              height={500}
              className="rounded-2xl shadow-xl w-full object-cover border-2 border-green-100"
            />
            <div className="absolute -bottom-12 -right-6 bg-white p-6 rounded-xl shadow-lg border border-green-200">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">15+</p>
                <p className="text-sm text-gray-600">Years of Impact</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-green-800 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2008, Hope Foundation began as a small community
              initiative with a simple yet powerful vision: to create lasting
              positive change in underserved communities around the world.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              What started as a group of passionate volunteers helping local
              families has grown into a global movement, touching the lives of
              over 100,000 people across 25 countries. Our journey has been one
              of learning, growing, and adapting to meet the evolving needs of
              the communities we serve.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we continue to be driven by the same core belief that
              inspired our founders: every person deserves access to basic
              necessities, education, and opportunities to thrive.
            </p>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div
        className="bg-white py-20 relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.03) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03) 0%, transparent 60%),
            linear-gradient(135deg, rgba(34, 197, 94, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: "300px 300px, 250px 250px, 40px 40px",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card
              className="p-8 text-center shadow-lg border border-green-100 bg-white/80 backdrop-blur-sm"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
                  linear-gradient(180deg, rgba(16, 185, 129, 0.02) 0%, transparent 100%)
                `,
              }}
            >
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower underserved communities through sustainable programs
                in education, healthcare, and economic development, creating
                lasting positive change that breaks the cycle of poverty.
              </p>
            </Card>

            {/* Vision */}
            <Card
              className="p-8 text-center shadow-lg border border-green-100 bg-white/80 backdrop-blur-sm"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
                  linear-gradient(180deg, rgba(34, 197, 94, 0.02) 0%, transparent 100%)
                `,
              }}
            >
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A world where every individual has equal access to
                opportunities, resources, and support needed to build a
                dignified and prosperous life for themselves and their families.
              </p>
            </Card>

            {/* Values */}
            <Card
              className="p-8 text-center shadow-lg border border-green-100 bg-white/80 backdrop-blur-sm"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 20%, rgba(20, 184, 166, 0.05) 0%, transparent 50%),
                  linear-gradient(180deg, rgba(34, 197, 94, 0.02) 0%, transparent 100%)
                `,
              }}
            >
              <div className="bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Our Values
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Integrity, compassion, sustainability, and community partnership
                guide our work. We believe in transparency, cultural respect,
                and empowering local leadership.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div
        className="bg-green-100 py-20 relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
            linear-gradient(45deg, rgba(34, 197, 94, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "200px 200px, 150px 150px, 30px 30px, 30px 30px",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">
              Real numbers, real change, real lives transformed
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                100K+
              </div>
              <p className="text-green-800 font-medium">Lives Impacted</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">25</div>
              <p className="text-green-800 font-medium">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-green-800 font-medium">Active Volunteers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">150</div>
              <p className="text-green-800 font-medium">Ongoing Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate individuals dedicated to making a difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <Card
            className="p-6 text-center shadow-lg border border-green-100 bg-white/90 backdrop-blur-sm"
            style={{
              backgroundImage: `
                radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.04) 0%, transparent 60%),
                linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, transparent 100%)
              `,
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpX_BZoIhTfK3nl8EcpmqfMQd9LdyC9qpszA&s"
              alt="Sarah Johnson - Executive Director"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4 border-4 border-green-200"
            />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Sarah Johnson
            </h3>
            <p className="text-green-600 font-medium mb-3">
              Executive Director
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              With 15 years of experience in international development, Sarah
              leads our strategic vision and oversees global operations across
              all our programs.
            </p>
          </Card>

          {/* Team Member 2 */}
          <Card
            className="p-6 text-center shadow-lg border border-green-100 bg-white/90 backdrop-blur-sm"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.04) 0%, transparent 60%),
                linear-gradient(45deg, rgba(34, 197, 94, 0.02) 0%, transparent 100%)
              `,
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpX_BZoIhTfK3nl8EcpmqfMQd9LdyC9qpszA&s"
              alt="Michael Chen - Program Director"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4 border-4 border-green-200"
            />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Michael Chen
            </h3>
            <p className="text-green-600 font-medium mb-3">Program Director</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Michael coordinates our field programs and ensures effective
              implementation of projects while maintaining strong relationships
              with local communities.
            </p>
          </Card>

          {/* Team Member 3 */}
          <Card
            className="p-6 text-center shadow-lg border border-green-100 bg-white/90 backdrop-blur-sm"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.04) 0%, transparent 60%),
                linear-gradient(90deg, rgba(34, 197, 94, 0.02) 0%, transparent 100%)
              `,
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpX_BZoIhTfK3nl8EcpmqfMQd9LdyC9qpszA&s"
              alt="Emily Rodriguez - Community Outreach Manager"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4 border-4 border-green-200"
            />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Emily Rodriguez
            </h3>
            <p className="text-green-600 font-medium mb-3">
              Community Outreach Manager
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Emily builds bridges between our organization and the communities
              we serve, ensuring our programs are culturally appropriate and
              community-driven.
            </p>
          </Card>
        </div>
      </div>

      {/* Programs Section */}
      <div
        className="bg-white py-20 relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
            linear-gradient(0deg, rgba(34, 197, 94, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: "250px 250px, 200px 200px, 50px 50px, 50px 50px",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions addressing the root causes of poverty
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Education Program */}
            <Card
              className="p-6 shadow-lg border border-green-100 bg-white/80 backdrop-blur-sm"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.04) 0%, transparent 50%)",
              }}
            >
              <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">
                Education & Literacy
              </h3>
              <p className="text-gray-700 mb-4">
                Building schools, training teachers, and providing educational
                resources to ensure every child has access to quality education.
              </p>

              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 50 schools built and renovated</li>
                <li>• 200+ teachers trained</li>
                <li>• 15,000 students enrolled</li>
              </ul>
            </Card>

            {/* Healthcare Program */}
            <Card
              className="p-6 shadow-lg border border-green-100 bg-white/80 backdrop-blur-sm"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)",
              }}
            >
              <div className="bg-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">
                Healthcare Access
              </h3>
              <p className="text-gray-700 mb-4">
                Establishing clinics, training healthcare workers, and providing
                essential medical services to underserved communities.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 25 health clinics established</li>
                <li>• 100+ healthcare workers trained</li>
                <li>• 75,000 patients treated annually</li>
              </ul>
            </Card>

            {/* Economic Development */}
            <Card
              className="p-6 shadow-lg border border-green-100 bg-white/80 backdrop-blur-sm"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.04) 0%, transparent 50%)",
              }}
            >
              <div className="bg-teal-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">
                Economic Development
              </h3>
              <p className="text-gray-700 mb-4">
                Supporting small businesses, providing microfinance, and
                creating sustainable income opportunities for families.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1,000+ small businesses supported</li>
                <li>• $2M in microloans provided</li>
                <li>• 5,000 jobs created</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <JoinOurMission />
    </div>
  );
}
