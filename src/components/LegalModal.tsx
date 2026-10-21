import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | 'disclaimer' | 'contact' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    terms: {
      title: 'Terms of Service',
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          <p>
            <strong>Use License:</strong> Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only.
          </p>
          <p>
            <strong>Disclaimer:</strong> The materials on this website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including fitness for a particular purpose.
          </p>
          <p>
            All trademarks, service marks, and trade names of SlimSana used in the site are trademarks or registered trademarks of their respective owners.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Your privacy is critically important to us. We respect your confidentiality regarding any information we may collect while operating our website.
          </p>
          <p>
            <strong>Information We Collect:</strong> We only collect information about you if we have a reason to do so—for example, to provide our services, communicate with you, or improve user experience.
          </p>
          <p>
            <strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service and hold certain information to enhance your browsing experience.
          </p>
          <p>
            We do not sell, rent, or share personal identifying information with third parties except when required by law.
          </p>
        </div>
      ),
    },
    disclaimer: {
      title: 'Health & Earnings Disclaimer',
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            <strong>FDA Statement:</strong> The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research.
          </p>
          <p>
            These products are not intended to diagnose, treat, cure, or prevent any disease. All information presented here is not meant as a substitute for or alternative to information from healthcare practitioners.
          </p>
          <p>
            Please consult your healthcare professional about potential interactions or other possible complications before using any product. The stories and testimonials depicted are real consumer experiences, but individual results may vary.
          </p>
        </div>
      ),
    },
    contact: {
      title: 'Contact Support',
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Have questions about SlimSana or need assistance with your order? Our customer support team is here to help!
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-sm text-gray-700">
            <div>
              <strong>Email:</strong> support@slimsana-official.com
            </div>
            <div>
              <strong>Hours of Operation:</strong> Monday – Friday, 9:00 AM – 6:00 PM EST
            </div>
            <div>
              <strong>Response Time:</strong> Within 24-48 business hours
            </div>
          </div>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-gray-900 text-base">{current.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 rounded-lg p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">{current.body}</div>

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
