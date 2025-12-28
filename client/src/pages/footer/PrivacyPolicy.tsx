import {
  Shield,
  Users,
  Lock,
  MessageCircle,
  Cookie,
  CheckCircle,
  Mail,
  Heart,
  TrendingUp,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradientCard } from "@/components/common/GradientCard";
import { UnifiedCTASection } from "@/components/common/UnifiedCTASection";

const PrivacyPolicyPage = () => {
  const lastUpdated = "December 2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron-200/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-india-green-200/20 rounded-full filter blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <PageHeader
        badge="Your Privacy Matters"
        title="Privacy Policy"
        subtitle="We believe in simple, honest communication. Here's how we protect and respect your personal information."
        backgroundVariant="gradient"
        size="md"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm mt-4">
          <Shield className="w-4 h-4 text-saffron-500" aria-hidden="true" />
          <span className="text-sm text-slate-600">
            Last updated: {lastUpdated}
          </span>
        </div>
      </PageHeader>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction Section */}
        <section className="mb-16" aria-labelledby="intro-heading">
          <GradientCard variant="tricolor" padding="lg">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-saffron-100 flex-shrink-0">
                <Heart
                  className="w-6 h-6 text-saffron-600"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h2
                  id="intro-heading"
                  className="text-xl sm:text-2xl font-bold text-slate-900 mb-4"
                >
                  Our Commitment to You
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
                  At{" "}
                  <strong className="text-saffron-600">
                    Azad Youth Organisation (AYO)
                  </strong>
                  , we're not just committed to empowering youth — we're
                  committed to respecting everyone who connects with us. Your
                  trust is the foundation of everything we do.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  This page explains, in plain language, what information we
                  collect, why we need it, and how we keep it safe. No legal
                  jargon, no hidden clauses — just honest transparency.
                </p>
              </div>
            </div>
          </GradientCard>
        </section>

        {/* Information We Collect */}
        <section className="mb-16" aria-labelledby="collect-heading">
          <SectionHeader
            badge="What We Gather"
            title="Information We Collect"
            badgeVariant="saffron"
            titleColor="default"
            align="left"
            className="mb-6"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-saffron-200/50 p-6 sm:p-8 shadow-sm">
            <div className="space-y-6">
              {/* Basic Details */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center flex-shrink-0">
                    <Users
                      className="w-4 h-4 text-saffron-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Basic Details
                  </h3>
                </div>
                <p className="text-slate-600 ml-11">
                  When you reach out to us or register, we ask for your name,
                  email, and phone number — just so we know who we're talking to
                  and can stay in touch.
                </p>
              </div>

              {/* Optional Information */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center flex-shrink-0">
                    <UserCheck
                      className="w-4 h-4 text-saffron-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Optional Information
                  </h3>
                </div>
                <p className="text-slate-600 ml-11">
                  You may choose to share additional details like your location,
                  profession, or areas of interest. This helps us connect you
                  with relevant programs and opportunities — but it's always
                  your choice.
                </p>
              </div>

              {/* Website Data */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp
                      className="w-4 h-4 text-saffron-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Website Usage
                  </h3>
                </div>
                <p className="text-slate-600 ml-11">
                  We collect basic anonymous data about how our website is used
                  (like which pages are popular) to help us improve your
                  experience. This doesn't identify you personally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-16" aria-labelledby="use-heading">
          <SectionHeader
            badge="Our Purpose"
            title="How We Use Your Information"
            badgeVariant="green"
            titleColor="default"
            align="left"
            className="mb-6"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-india-green-200/50 p-6 sm:p-8 shadow-sm">
            <div className="grid sm:grid-cols-3 gap-6">
              {/* Communication */}
              <div className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-india-green-100 flex items-center justify-center mx-auto sm:mx-0 mb-3">
                  <MessageCircle
                    className="w-6 h-6 text-india-green-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Staying Connected
                </h3>
                <p className="text-slate-600 text-sm">
                  We respond when you reach out, share updates about programs
                  you've shown interest in, and invite you to events in your
                  area.
                </p>
              </div>

              {/* Coordination */}
              <div className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-india-green-100 flex items-center justify-center mx-auto sm:mx-0 mb-3">
                  <Users
                    className="w-6 h-6 text-india-green-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Program Coordination
                </h3>
                <p className="text-slate-600 text-sm">
                  When you volunteer or participate, we use your information to
                  match you with the right opportunities and ensure smooth
                  coordination.
                </p>
              </div>

              {/* Improvement */}
              <div className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-india-green-100 flex items-center justify-center mx-auto sm:mx-0 mb-3">
                  <TrendingUp
                    className="w-6 h-6 text-india-green-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Getting Better
                </h3>
                <p className="text-slate-600 text-sm">
                  We analyze anonymous patterns to understand what matters to
                  you and continuously improve our website and programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sharing & Security */}
        <section className="mb-16" aria-labelledby="security-heading">
          <SectionHeader
            badge="Your Safety"
            title="Data Sharing & Security"
            badgeVariant="saffron"
            titleColor="default"
            align="left"
            className="mb-6"
          />
          <div className="space-y-6">
            {/* What We Never Do */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-saffron-200/50 p-6 sm:p-8 shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center flex-shrink-0">
                    <Shield
                      className="w-5 h-5 text-saffron-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    What We Will Never Do
                  </h3>
                </div>
                <ul className="space-y-3 ml-2">
                  <li className="flex items-start gap-3">
                    <span
                      className="text-red-500 font-bold mt-0.5"
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span className="text-slate-700">
                      <strong>Sell your personal information.</strong> Ever.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span
                      className="text-red-500 font-bold mt-0.5"
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span className="text-slate-700">
                      Share your details with anyone without your knowledge
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span
                      className="text-red-500 font-bold mt-0.5"
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span className="text-slate-700">
                      Use your information for purposes you didn't agree to
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* How We Protect */}
            <div className="bg-india-green-50/50 rounded-2xl border border-india-green-200/50 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-india-green-100 flex items-center justify-center flex-shrink-0">
                  <Lock
                    className="w-5 h-5 text-india-green-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  How We Protect Your Data
                </h3>
              </div>
              <p className="text-slate-700 mb-4">
                We use secure connections (HTTPS), store data on protected
                servers, and limit access to only team members who need it.
              </p>
              <p className="text-slate-600 text-sm italic">
                We're a growing organization, and while we can't promise
                perfection, we're always working to strengthen our security
                practices.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies & Website Usage */}
        <section className="mb-16" aria-labelledby="cookies-heading">
          <SectionHeader
            badge="Technical Stuff"
            title="Cookies & Website Usage"
            badgeVariant="green"
            titleColor="default"
            align="left"
            className="mb-6"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-india-green-200/50 p-6 sm:p-8 shadow-sm">
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-india-green-100 items-center justify-center flex-shrink-0">
                  <Cookie
                    className="w-5 h-5 text-india-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    What Are Cookies?
                  </h3>
                  <p className="text-slate-600">
                    Cookies are small text files that help websites remember
                    preferences and understand how people use them. Think of
                    them as little sticky notes your browser keeps.
                  </p>
                </div>
              </div>

              <div className="bg-india-green-50/50 rounded-xl p-4 sm:p-6">
                <h4 className="font-semibold text-slate-800 mb-3">
                  How We Use Them:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-india-green-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-slate-700">
                      <strong>Functional cookies:</strong> Remember if you're
                      logged in and your preferences
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-india-green-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-slate-700">
                      <strong>Analytics cookies:</strong> Help us understand
                      which pages are helpful (anonymously)
                    </span>
                  </li>
                </ul>
                <p className="text-slate-600 text-sm mt-4 pt-4 border-t border-india-green-200">
                  We don't use advertising or tracking cookies that follow you
                  around the internet. Your browser lets you control or delete
                  cookies anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights & Choices */}
        <section className="mb-16" aria-labelledby="rights-heading">
          <SectionHeader
            badge="You're In Control"
            title="Your Rights & Choices"
            badgeVariant="saffron"
            titleColor="default"
            align="left"
            className="mb-6"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-saffron-200/50 p-6 sm:p-8 shadow-sm">
            <div>
              <p className="text-slate-700 mb-6 text-lg">
                You're in control of your information. Here's what you can do:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-4 p-4 bg-saffron-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-saffron-700 font-bold">1</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Access</strong> your personal information
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-saffron-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-saffron-700 font-bold">2</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Correct</strong> any inaccuracies
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-saffron-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-saffron-700 font-bold">3</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Request deletion</strong> of your data
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-saffron-50/50 rounded-xl">
                  <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-saffron-700 font-bold">4</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Opt out</strong> of communications
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 text-center sm:text-left">
                <p className="text-slate-600">
                  To exercise any of these rights, just email us at{" "}
                  <a
                    href="mailto:ayoindia1@gmail.com"
                    className="text-saffron-600 hover:text-saffron-700 font-medium hover:underline"
                  >
                    ayoindia1@gmail.com
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+919942495941"
                    className="text-saffron-600 hover:text-saffron-700 font-medium hover:underline"
                  >
                    +91 9942495941
                  </a>
                  . We'll respond within a few days — no complicated forms
                  required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Updates */}
        <section className="mb-16" aria-labelledby="updates-heading">
          <GradientCard variant="warm" padding="lg">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-warm-200 flex-shrink-0">
                <RefreshCw
                  className="w-6 h-6 text-warm-600"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h2
                  id="updates-heading"
                  className="text-xl sm:text-2xl font-bold text-slate-900 mb-3"
                >
                  Policy Updates
                </h2>
                <p className="text-slate-700 mb-3">
                  This policy may evolve as we grow, improve our systems, or as
                  laws change. When we make updates, we'll note the new date at
                  the top of this page.
                </p>
                <p className="text-slate-600">
                  We encourage you to revisit this page occasionally, especially
                  if you're actively involved with us. For any significant
                  changes that affect your rights, we'll do our best to
                  communicate directly.
                </p>
              </div>
            </div>
          </GradientCard>
        </section>
      </main>

      {/* Contact CTA Section */}
      <UnifiedCTASection
        title={
          <>
            Questions About <span className="text-saffron-400">Your</span>{" "}
            <span className="text-india-green-400">Privacy</span>?
          </>
        }
        subtitle="We're here to help. Reach out anytime with questions about how we handle your information."
        primaryAction={{
          label: "Contact Us",
          href: "/contact",
          icon: Mail,
        }}
        secondaryAction={{
          label: "Learn About Us",
          href: "/about",
          icon: Users,
        }}
        phone="+91 9942495941"
        email="ayoindia1@gmail.com"
      />
    </div>
  );
};

export default PrivacyPolicyPage;
