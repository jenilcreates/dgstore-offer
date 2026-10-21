import React, { useState } from 'react';
import { Settings, X, ExternalLink, Video, Link2, Check, RefreshCw } from 'lucide-react';
import { LandingPageConfig } from '../types';

interface ConfigDrawerProps {
  config: LandingPageConfig;
  onUpdateConfig: (newConfig: Partial<LandingPageConfig>) => void;
  onResetDefault: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({
  config,
  onUpdateConfig,
  onResetDefault,
  isOpen,
  onToggle,
}) => {
  const [ctaUrlInput, setCtaUrlInput] = useState(config.ctaUrl);
  const [videoUrlInput, setVideoUrlInput] = useState(config.videoUrl);
  const [btnLine1, setBtnLine1] = useState(config.ctaTextLine1);
  const [btnLine2, setBtnLine2] = useState(config.ctaTextLine2);
  const [openInNewTab, setOpenInNewTab] = useState(config.openInNewTab);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ctaUrl: ctaUrlInput,
      videoUrl: videoUrlInput,
      ctaTextLine1: btnLine1,
      ctaTextLine2: btnLine2,
      openInNewTab,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const setSampleVideo = () => {
    const demo = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    setVideoUrlInput(demo);
  };

  return (
    <>
      {/* Floating Pill Button to open/close settings */}
      <div className="fixed bottom-4 right-4 z-40 print:hidden">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 bg-gray-900/90 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-xl border border-gray-700/80 backdrop-blur-md text-xs font-semibold tracking-wide transition-all duration-200 transform hover:scale-105 active:scale-95"
          title="Configure CTA Link & Video URL"
        >
          <Settings className="w-4 h-4 text-sky-400 animate-[spin_6s_linear_infinite]" />
          <span>CTA & Video Settings</span>
          {config.ctaUrl && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          )}
        </button>
      </div>

      {/* Modal / Slide-out panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white leading-tight">
                    Landing Page Links & Video
                  </h3>
                  <p className="text-xs text-gray-300">
                    Paste your video URL and destination CTA link
                  </p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="text-gray-400 hover:text-white rounded-lg p-1.5 transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Note banner */}
              <div className="bg-sky-50 border border-sky-200 text-sky-900 rounded-xl p-3 text-xs leading-relaxed flex items-start gap-2.5">
                <div className="text-sky-600 mt-0.5">ℹ️</div>
                <div>
                  <strong>You can send your video and CTA link here or in chat!</strong>
                  <div className="text-sky-800 mt-0.5">
                    Any links you paste here take effect immediately and are saved locally.
                  </div>
                </div>
              </div>

              {/* Video URL Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-sky-600" />
                    Video URL (YouTube / Vimeo / MP4)
                  </span>
                  <button
                    type="button"
                    onClick={setSampleVideo}
                    className="text-[11px] text-sky-600 hover:text-sky-800 font-medium lowercase"
                  >
                    fill sample link
                  </button>
                </label>
                <input
                  type="text"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or direct MP4 link"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
                <p className="text-[11px] text-gray-500">
                  Leave empty to keep the original screenshot presentation thumbnail.
                </p>
              </div>

              {/* CTA Destination URL Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-amber-600" />
                  CTA Destination URL (Affiliate / Checkout / Product)
                </label>
                <input
                  type="text"
                  value={ctaUrlInput}
                  onChange={(e) => setCtaUrlInput(e.target.value)}
                  placeholder="https://example.com/slimsana-special-offer"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <p className="text-[11px] text-gray-500">
                  Where users land after clicking &quot;Yes! I want to know the resolution.&quot;
                </p>
              </div>

              {/* Button Text Customization */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">
                    Button Line 1
                  </label>
                  <input
                    type="text"
                    value={btnLine1}
                    onChange={(e) => setBtnLine1(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">
                    Button Line 2
                  </label>
                  <input
                    type="text"
                    value={btnLine2}
                    onChange={(e) => setBtnLine2(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Open in new tab checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="newTabCheckbox"
                  checked={openInNewTab}
                  onChange={(e) => setOpenInNewTab(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
                />
                <label htmlFor="newTabCheckbox" className="text-xs text-gray-700 cursor-pointer select-none">
                  Open CTA link in a new browser tab (<code className="text-gray-500">_blank</code>)
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onResetDefault();
                    setCtaUrlInput('');
                    setVideoUrlInput('');
                    setBtnLine1('Yes! I want to know');
                    setBtnLine2('the resolution.');
                    setOpenInNewTab(true);
                  }}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium py-2 px-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onToggle}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 bg-[#F4BA43] hover:bg-[#e6aa32] text-black text-xs font-bold rounded-lg shadow transition-all transform active:scale-95"
                  >
                    {savedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-800" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
