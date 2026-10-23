/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LandingPageConfig } from './types';
import { ChevronDown } from 'lucide-react';

const STORAGE_KEY = 'slimsana_landing_config_v9';

const DEFAULT_CONFIG: LandingPageConfig = {
  videoUrl: 'https://www.youtube.com/embed/qqVMmCIfW6M?si=BcJU_tm7SNxQPcEw',
  videoThumbnailUrl: '/assets/guarantee_banner_60days.webp',
  ctaUrl: 'https://myslimsana.com/slimsana-vsl-fe?aff=jenildgstore&cam=CAMPAIGNKEY',
  ctaTextLine1: 'Ja! Ich möchte die Lösung erfahren',
  ctaTextLine2: '',
  openInNewTab: true,
};

export default function App() {
  const [config, setConfig] = useState<LandingPageConfig>(DEFAULT_CONFIG);

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

  const handleCtaClick = () => {
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
    }
  };

  const handleScrollToCta = () => {
    const el = document.getElementById('main-cta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      handleCtaClick();
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-['Montserrat',sans-serif] selection:bg-sky-200 selection:text-black">
      {/* =========================================================================
          HERO SECTION (From Screenshot 1 - Deutsch)
          ========================================================================= */}
      <header className="w-full pt-12 md:pt-16 pb-8 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline with 2nd line in sky blue */}
          <h1 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-black text-black tracking-tight leading-[1.2] mb-4">
            SlimSana unterstützt Deine gesündere, glücklichere{' '}
            <br className="hidden sm:inline" />
            <span style={{ color: '#33B1FF' }} className="text-sky-blue">
              Alltagsroutine mit Leichtigkeit und Selbstvertrauen
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-gray-700 text-sm sm:text-base md:text-[17px] font-normal leading-relaxed mb-6 md:mb-8 px-2">
            SlimSana fügt sich mühelos in Deine tägliche Wohlfühlroutine ein – mit einfachen,
            unterstützenden Gewohnheiten. Fühle Dich gut dabei, einen praktischen Schritt nach vorne
            zu machen, ganz ohne extreme Regeln oder komplizierte Pläne.
          </p>

          {/* Top Affiliate Button that scrolls down to main CTA */}
          <div className="mb-8 md:mb-10 flex justify-center">
            <button
              onClick={handleScrollToCta}
              type="button"
              className="group inline-flex items-center gap-2 bg-[#F4BA43] hover:bg-[#ebaa32] active:bg-[#df9f27] text-black font-extrabold text-base sm:text-lg md:text-xl px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#e0a42f]/30 select-none"
              aria-label="Ja! Ich möchte die Lösung erfahren"
            >
              <span className="leading-tight tracking-tight">
                Ja! Ich möchte die Lösung erfahren
              </span>
              <ChevronDown className="w-5 h-5 text-black group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 2: LIGHT BLUE BANNER 1 (Deutsch)
          ========================================================================= */}
      <section className="w-full bg-[#C2E8FF] py-6 md:py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-[26px] lg:text-[28px] font-extrabold text-black tracking-tight leading-snug">
            Kennen Sie das frustrierende Gefühl?
          </h2>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FRUSTRATING FEELING & GLP-1 STORY (Side-by-side + Guarantee Banner)
          ========================================================================= */}
      <section className="w-full bg-white py-12 md:py-16 px-6">
        <div className="max-w-[960px] mx-auto">
          {/* Side-by-side: Left side green bottles, Right side context */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Green Bottles Image */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-[320px] md:max-w-[360px]">
                <img
                  src="/assets/slimsana_bottles_portrait.webp"
                  alt="SlimSana Flaschen"
                  className="w-full h-auto object-contain mx-auto"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Context without excessive blank spaces */}
            <div className="md:col-span-7">
              <div className="space-y-3.5 text-[#222222] text-sm sm:text-base leading-relaxed">
                <p>
                  Sie hören überall Geschichten von Menschen, die ihre Gewohnheiten ändern und sich gesünder fühlen. Freunde und Kollegen, die davon berichten, wie energiegeladen und ausgeglichen sie sind.
                </p>

                <p className="font-semibold text-gray-900">
                  Aber bei Ihnen? Fehlanzeige.
                </p>

                <p>
                  Ihr Hausarzt wiegelt ab: „Sie sind nicht krank genug für GLP-1-Medikamente.“ Die Privatpraxis verlangt mindestens 300 Euro pro Monat – Geld, das Sie einfach nicht haben. Die Wartelisten sind endlos. Monate vergehen. Ihr Gewicht steigt immer weiter.
                </p>

                <p>
                  Und währenddessen kämpfen Sie jeden Tag gegen denselben unbarmherzigen Feind: Der Heißhunger um 15:00 Uhr, der all Ihre Disziplin zerstört. Der nächtliche Heißhunger auf Süßes, gegen den Ihr Wille vollkommen machtlos ist. Die unkontrollierbaren Gelüste, die Sie zu einer Fremden im eigenen Körper machen.
                </p>

                <p>
                  Sie wissen genau, was Sie essen sollten. Sie kennen jeden Diät-Tipp. Aber Ihr Gehirn arbeitet gegen Sie.
                </p>

                <p className="font-semibold text-gray-900">
                  Das war bisher die traurige Realität.
                </p>

                <p>
                  Was jahrelang Hollywood-Stars vorbehalten war, können Sie sich jetzt ganz einfach in die eigene Küche holen.
                </p>

                <p className="font-bold text-black">
                  Eine Kapsel am Tag. Das ist alles, was Sie brauchen.
                </p>

                <p className="text-gray-700">
                  Keine komplizierten Schritte. Keine invasiven Methoden. Keine Terminprobleme. Keine Wartelisten.
                </p>
              </div>
            </div>
          </div>

          {/* 60-Tage Garantie Banner Moved Under This Section */}
          <div className="mt-12 md:mt-16 pt-4">
            <div
              onClick={handleScrollToCta}
              className="relative aspect-video w-full max-w-[840px] mx-auto rounded-md overflow-hidden bg-[#FAF2E7] shadow-xl group border border-gray-100 cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.01]"
              title="Klicken, um mehr zu erfahren"
            >
              <img
                src="/assets/guarantee_banner_60days.webp"
                alt="Ihre 60-Tage Wirkt-besser-als-erwartet Garantie"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LIGHT BLUE BANNER 2 (Deutsch)
          ========================================================================= */}
      <section className="w-full bg-[#C2E8FF] py-6 md:py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-[26px] lg:text-[28px] font-extrabold text-black tracking-tight leading-snug">
            Könnte SlimSanas smarterer Ansatz auch Dir helfen, dauerhafte, gesunde Abnehmerfolge zu erzielen?
          </h2>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ABOUT ME, CLAUDIA (Deutsch)
          ========================================================================= */}
      <section className="w-full bg-white py-12 md:py-16 px-6">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Story Column */}
            <div className="md:col-span-7 lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-black tracking-tight mb-5">
                Über mich, Claudia
              </h2>

              <div className="space-y-4 md:space-y-5 text-[#222222] text-sm sm:text-base md:text-[16px] leading-[1.65]">
                <p>
                  Ich habe früher jeden Montag mit großen Versprechungen begonnen und endete jeden Freitag wieder frustriert und festgefahren. Meine Energie war am Boden, meine Routine ein einziges Durcheinander, und „gesund werden“ fühlte sich an wie ein weiterer Vollzeitjob.
                </p>

                <p>
                  Dann stieß ich auf SlimSana. Kein Drama. Kein komplizierter Plan. Einfach eine praktische, bequeme Ergänzung meiner täglichen Routine, die mir half, mich auf meine Ziele zu fokussieren. Schritt für Schritt traf ich bessere Entscheidungen, bewegte mich mit neuem Selbstvertrauen und begann, wieder für mich selbst da zu sein.
                </p>

                <p>
                  SlimSana hat die Arbeit nicht für mich erledigt, aber es hat den Weg so viel leichter gemacht. Es wurde zu meiner täglichen Erinnerung daran, dass Fortschritt nicht perfekt sein muss, um unglaublich wirksam zu sein.
                </p>

                <p>
                  Wochen später bemerkte ich die echte Veränderung: mehr Selbstbewusstsein, mehr Beständigkeit und eine Routine, an die ich mich wirklich halten konnte. Ich ging vom ständigen Neuanfangen dazu über, endlich echten Schwung aufzubauen.
                </p>

                <p>
                  Meine Transformation begann mit einer einzigen, einfachen Entscheidung: SlimSana. Wenn Du bereit bist, nicht mehr auf den „richtigen Zeitpunkt“ zu warten, sondern endlich Deine Ziele anzupacken, mache SlimSana noch heute zum Teil Deiner Routine.
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
          SECTION 6: BOTTOM LIGHT BLUE BANNER WITH MAIN CTA BUTTON (Deutsch)
          ========================================================================= */}
      <section id="main-cta" className="w-full bg-[#C2E8FF] py-12 md:py-16 px-4 text-center scroll-mt-6">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-4">
          <button
            onClick={handleCtaClick}
            type="button"
            className="group relative w-full inline-flex items-center justify-center bg-[#F4BA43] hover:bg-[#ebaa32] active:bg-[#df9f27] text-black font-extrabold text-base sm:text-xl md:text-2xl lg:text-[24px] px-6 sm:px-10 py-4 sm:py-5 md:py-5.5 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#e0a42f]/30 select-none"
            aria-label="Ja! Ich möchte die Lösung erfahren"
          >
            <span className="leading-tight tracking-tight whitespace-normal sm:whitespace-nowrap">
              {config.ctaTextLine1 || 'Ja! Ich möchte die Lösung erfahren'}
            </span>

            {/* Subtle glow / hover shine */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          FOOTER (Affiliate Disclosure)
          ========================================================================= */}
      <footer
        style={{ fontSize: '14px', lineHeight: '22px', color: '#d5d5d5' }}
        className="w-full bg-white py-10 md:py-14 mt-auto border-t border-gray-100"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-normal" style={{ fontSize: '14px', lineHeight: '22px', color: '#d5d5d5' }}>
            Diese Seite enthält Affiliate-Links. Bei einem Kauf über diese Links erhalte ich möglicherweise eine Provision, ohne dass Dir zusätzliche Kosten entstehen.
          </p>
        </div>
      </footer>
    </div>
  );
}
