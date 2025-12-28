import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Images, MessageCircle, ExternalLink } from "lucide-react";

interface QuickLink {
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

const quickLinks: QuickLink[] = [
  {
    label: "Programs",
    href: "/programs",
    icon: BookOpen,
    description: "Explore our initiatives",
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: Images,
    description: "View our activities",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: MessageCircle,
    description: "Get support",
  },
];

export const QuickLinksPanel: React.FC = () => {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Quick Links
      </h4>
      <div className="space-y-2">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              to={link.href}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 hover:bg-saffron-50
                         transition-all duration-200 group"
            >
              <div className="p-1.5 rounded-md bg-white shadow-sm group-hover:bg-saffron-100 transition-colors">
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-saffron-600 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 group-hover:text-saffron-700 transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {link.description}
                </p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-saffron-500 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinksPanel;
