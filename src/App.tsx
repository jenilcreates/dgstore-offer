/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { ConfigDrawer } from './components/ConfigDrawer';
import { LandingPageConfig } from './types';
import { Sparkles } from 'lucide-react';

const STORAGE_KEY = 'slimsana_landing_config_v3';

const DEFAULT_CONFIG: LandingPageConfig = {
  videoUrl: 'https://www.youtube.com/embed/qqVMmCIfW6M?si=BcJU_tm7SNxQPcEw',
  videoThumbnailUrl: '/assets/video_thumbnail.png',
  ctaUrl: 'https://myslimsana.com/slimsana-vsl-fe?aff=jenildgstore&cam=CAMPAIGNKEY',
  ctaTextLine1: 'Yes! I want to know',
  ctaTextLine2: 'the resolution.',
  openInNewTab: true,
};

export default function App() {
  const [config, setConfig] = useState<LandingPageConfig>(DEFAULT_CONFIG);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [showCtaNotification, setShowCtaNotification] = useState<boolean>(false);

  // Load configuration from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setConfig(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleUpdateConfig = (newSettings: Partial<LandingPageConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  const handleResetDefault = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    if (config.ctaUrl && config.ctaUrl.trim() !== '') {
      let targetUrl = config.ctaUrl.trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
      }
      if (config.openInNewTab) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = targetUrl;
      }
    } else {
      e.preventDefault();
      setShowCtaNotification(true);
      setTimeout(() => setShowCtaNotification(false), 4000);
      setIsConfigOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-['Montserrat',sans-serif] selection:bg-sky-200 selection:text-black">
      {/* Optional Top Notification when CTA is not yet configured */}
      {showCtaNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium">
            CTA Link clicked! You can paste your link into the settings window.
          </span>
        </div>
      )}

      {/* =========================================================================
          HERO SECTION (From Screenshot 1)
          ========================================================================= */}
      <header className="w-full pt-12 md:pt-16 pb-8 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-black text-black tracking-tight leading-[1.2] mb-4">
            SlimSana Supports Your Healthier, Happier{' '}
            <br className="hidden sm:inline" />
            Everyday Routine with{' '}
            <span className="text-[#38bdf8]">Ease and Confidence</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-gray-700 text-sm sm:text-base md:text-[17px] font-normal leading-relaxed mb-8 md:mb-10 px-2">
            SlimSana fits easily into your daily wellness routine with simple,
            supportive habits. Feel good about taking a practical step forward
            without extreme rules or complicated plans.
          </p>

          {/* Video Player */}
          <div className="w-full">
            <VideoPlayer
              videoUrl={config.videoUrl}
              thumbnailUrl={config.videoThumbnailUrl}
              onOpenSettings={() => setIsConfigOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 2: LIGHT BLUE BANNER 1 (From Screenshot 2)
          ========================================================================= */}
      <section className="w-full bg-[#C2E8FF] py-6 md:py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-[26px] lg:text-[28px] font-extrabold text-black tracking-tight leading-snug">
            What’s SlimSana’s surprising secret to making weight-loss goals feel achievable?
          </h2>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: NARRATIVE COPY (From Screenshot 2)
          ========================================================================= */}
      <section className="w-full bg-white py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto space-y-6 md:space-y-7 text-[#222222] text-sm sm:text-base md:text-[16.5px] leading-[1.65]">
          <p>
            Keep up with all the things with just minutes a day. See how you can work less and still see results. Even if you think you&apos;re a clutter-bug... or that your time will never come! We&apos;ve been there too!! Instead of juggling all the things. Get clarity!
          </p>

          <p>
            For a limited time, get access to our SlimSana brand name and begin creating your new life. Meet SlimSana, your simple path to feeling lighter, more confident, and in control without extreme routines or complicated meal plans.
          </p>

          <p>
            Enjoy convenient support that fits busy days, helping you build healthier habits one easy win at a time. Whether you’re starting fresh or getting back on track, SlimSana makes progress feel achievable.
          </p>

          <p>
            With clear guidance, dependable quality, and a satisfaction guarantee, you can take the next step with less worry and more confidence in the person you’re becoming.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LIGHT BLUE BANNER 2 (From Screenshot 2)
          ========================================================================= */}
      <section className="w-full bg-[#C2E8FF] py-6 md:py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-[26px] lg:text-[28px] font-extrabold text-black tracking-tight leading-snug">
            Could SlimSana’s smarter approach help you achieve lasting, healthy weight-loss results?
          </h2>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ABOUT ME, CLAUDIA (From Screenshot 3)
          ========================================================================= */}
      <section className="w-full bg-white py-12 md:py-16 px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Story Column */}
            <div className="md:col-span-7 lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-black tracking-tight mb-5">
                About Me, Claudia
              </h2>

              <div className="space-y-4 md:space-y-5 text-[#222222] text-sm sm:text-base md:text-[16px] leading-[1.65]">
                <p>
                  I used to start every Monday with big promises and end every Friday feeling stuck. My energy was low, my routine was all over the place, and “getting healthy” felt like another full-time job.
                </p>

                <p>
                  Then I found SlimSana. No drama. No complicated plan. Just a simple, convenient addition to my daily routine that helped me stay focused on my goals. One day at a time, I started making better choices, moving with more confidence, and showing up for myself again.
                </p>

                <p>
                  SlimSana didn’t do the work for me but it made the journey feel easier to manage. It became my daily reminder that progress doesn’t have to be perfect to be powerful.
                </p>

                <p>
                  Weeks later, I noticed the real shift: more confidence, more consistency, and a routine I could actually stick with. I went from constantly restarting to finally building momentum.
                </p>

                <p>
                  My transformation started with one simple choice: SlimSana. If you’re ready to stop waiting for the “right time” and start moving toward your goals, make SlimSana part of your routine today.
                </p>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end">
              <div className="relative group w-full max-w-[320px] rounded-lg overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                <img
                  src="/assets/aistudio/Claudia_Weber_60009a78.jpg"
                  alt="Claudia Weber - SlimSana Transformation Story"
                  className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BOTTOM LIGHT BLUE BANNER WITH CTA BUTTON (From Screenshot 3)
          ========================================================================= */}
      <section className="w-full bg-[#C2E8FF] py-14 md:py-20 px-4 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <button
            onClick={handleCtaClick}
            type="button"
            className="group relative inline-flex flex-col items-center justify-center bg-[#F4BA43] hover:bg-[#ebaa32] active:bg-[#df9f27] text-black font-extrabold text-lg sm:text-xl md:text-[22px] px-8 sm:px-12 py-3.5 sm:py-4 md:py-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#e0a42f]/30 select-none"
            aria-label="Yes! I want to know the resolution."
          >
            <span className="leading-tight tracking-tight">
              {config.ctaTextLine1 || 'Yes! I want to know'}
            </span>
            <span className="leading-tight tracking-tight">
              {config.ctaTextLine2 || 'the resolution.'}
            </span>

            {/* Subtle glow / hover shine */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          FOOTER (Blank with Affiliate Disclaimer)
          ========================================================================= */}
      <footer className="w-full bg-white py-12 px-4 text-center mt-auto">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            Affiliate Disclaimer: Please note that some links on this page are affiliate links, and we may earn a commission if you make a purchase through them at no extra cost to you.
          </p>
        </div>
      </footer>

      {/* Config Drawer for Video and CTA URL */}
      <ConfigDrawer
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetDefault={handleResetDefault}
        isOpen={isConfigOpen}
        onToggle={() => setIsConfigOpen(!isConfigOpen)}
      />
    </div>
  );
}
