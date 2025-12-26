import { User, Quote } from "lucide-react";

const FounderMessageSection = () => {
  return (
    <div className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header - Minimal */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-green-50 border border-slate-200 mb-6">
            <Quote className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-slate-700 tracking-wide">
              Founder's Vision
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-800 mb-2">
            संस्थापक का संदेश
          </h2>
          <p className="text-sm text-slate-500">Founder's Message</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Subtle Top Accent */}
            <div className="h-0.5 bg-gradient-to-r from-orange-200 via-slate-100 to-green-200" />

            <div className="p-8 sm:p-12 lg:p-14">
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                {/* Founder Info - Minimal & Light */}
                <div className="lg:col-span-1 flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
                      <User className="w-14 h-14 text-slate-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-slate-800">
                      Kafeel Ahmad Azad
                    </h3>
                    <p className="text-sm text-orange-600 font-medium">
                      संस्थापक
                    </p>
                    <p className="text-xs text-slate-500">
                      Azad Youth Organization
                    </p>
                  </div>
                </div>

                {/* Message - Clean & Readable */}
                <div className="lg:col-span-2 space-y-5 text-base text-slate-700 leading-relaxed">
                  <div className="bg-gradient-to-r from-orange-50/50 to-green-50/50 px-5 py-3 rounded-2xl border-l-3 border-orange-300">
                    <p className="font-medium text-slate-800">
                      मेरे प्यारे युवा साथियों,
                    </p>
                  </div>

                  <p className="pl-4 border-l-2 border-slate-200">
                    मेरे लिए देश सबसे पहले आता है। इसी सोच के साथ मैंने आज़ाद
                    यूथ ऑर्गनाइज़ेशन की स्थापना की। हमारा एकमात्र लक्ष्य आप जैसे
                    छात्रों और युवाओं को सशक्त बनाना है, क्योंकि{" "}
                    <span className="font-medium text-orange-600">
                      आप ही हमारे देश का भविष्य हैं।
                    </span>
                  </p>

                  <p className="pl-4 border-l-2 border-slate-200">
                    मेरा सपना एक ऐसे भारत का है जहाँ हर नागरिक{" "}
                    <span className="font-medium text-green-600">
                      परिपक्व लोकतंत्र के मूल्यों
                    </span>{" "}
                    को समझे और जिम्मेदारी से अपना योगदान दे। हम शिक्षा, नैतिकता
                    और वैज्ञानिक सोच के माध्यम से इसी दिशा में काम कर रहे हैं।
                  </p>

                  <div className="bg-gradient-to-r from-orange-100 to-green-100 px-6 py-4 rounded-2xl text-center border border-orange-200/50">
                    <p className="font-semibold text-slate-800 mb-1">
                      आइए, हम सब मिलकर एक ऐसा सशक्त और जागरूक भारत बनाएं!
                    </p>
                    <p className="text-xl font-bold text-orange-600">
                      जय हिंद!
                    </p>
                  </div>

                  {/* Signature - Subtle */}
                  <div className="pt-4 text-right">
                    <p className="font-semibold text-slate-800">
                      - Kafeel Ahmad Azad
                    </p>
                    <p className="text-sm text-slate-500 italic">Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Bottom Accent */}
            <div className="h-0.5 bg-gradient-to-r from-orange-200 via-slate-100 to-green-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderMessageSection;
