/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { LandingPageConfig } from './types';

const STORAGE_KEY = 'slimsana_landing_config_v4';

const DEFAULT_CONFIG: LandingPageConfig = {
  videoUrl: 'https://www.youtube.com/embed/qqVMmCIfW6M?si=BcJU_tm7SNxQPcEw',
  videoThumbnailUrl: '/assets/video_thumbnail.png',
  ctaUrl: 'https://myslimsana.com/slimsana-vsl-fe?aff=jenildgstore&cam=CAMPAIGNKEY',
  ctaTextLine1: 'Ja! Ich möchte die',
  ctaTextLine2: 'Lösung erfahren.',
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

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-['Montserrat',sans-serif] selection:bg-sky-200 selection:text-black">
      {/* =========================================================================
          HERO SECTION (From Screenshot 1 - Deutsch)
          ========================================================================= */}
      <header className="w-full pt-12 md:pt-16 pb-8 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-black text-black tracking-tight leading-[1.2] mb-4">
            SlimSana unterstützt Deine gesündere, glücklichere{' '}
            <br className="hidden sm:inline" />
            Alltagsroutine mit{' '}
            <span className="text-[#38bdf8]">Leichtigkeit und Selbstvertrauen</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-gray-700 text-sm sm:text-base md:text-[17px] font-normal leading-relaxed mb-8 md:mb-10 px-2">
            SlimSana fügt sich mühelos in Deine tägliche Wohlfühlroutine ein – mit einfachen,
            unterstützenden Gewohnheiten. Fühle Dich gut dabei, einen praktischen Schritt nach vorne
            zu machen, ganz ohne extreme Regeln oder komplizierte Pläne.
          </p>

          {/* Video Player */}
          <div className="w-full">
            <VideoPlayer
              videoUrl={config.videoUrl}
              thumbnailUrl={config.videoThumbnailUrl}
            />
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 2: LIGHT BLUE BANNER 1 (Deutsch)
          ========================================================================= */}
      <section className="w-full bg-[#C2E8FF] py-6 md:py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-[26px] lg:text-[28px] font-extrabold text-black tracking-tight leading-snug">
            Was ist SlimSanas überraschendes Geheimnis, mit dem Abnehmziele endlich erreichbar werden?
          </h2>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: NARRATIVE COPY (Deutsch)
          ========================================================================= */}
      <section className="w-full bg-white py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto space-y-6 md:space-y-7 text-[#222222] text-sm sm:text-base md:text-[16.5px] leading-[1.65]">
          <p>
            Bleib am Ball – mit nur wenigen Minuten am Tag. Erfahre, wie Du mit weniger Aufwand spürbare Ergebnisse erzielst. Selbst wenn Du glaubst, dass Du es nie schaffst oder Deine Zeit nie kommen wird: Wir kennen dieses Gefühl nur zu gut! Statt ständig alles gleichzeitig zu jonglieren: Gewinne endlich Klarheit!
          </p>

          <p>
            Für begrenzte Zeit: Entdecke SlimSana und beginne noch heute, Dein neues Leben zu gestalten. Lerne SlimSana kennen – Deinen einfachen Weg, Dich leichter, selbstbewusster und voller Energie zu fühlen, ganz ohne extreme Diätroutinen oder komplizierte Ernährungspläne.
          </p>

          <p>
            Genieße praktische Unterstützung, die perfekt in Deinen vollen Alltag passt und Dir hilft, gesündere Gewohnheiten Schritt für Schritt aufzubauen. Egal, ob Du ganz neu startest oder wieder auf Kurs kommen möchtest: SlimSana macht spürbare Fortschritte wieder greifbar.
          </p>

          <p>
            Mit klarer Führung, verlässlicher Qualität und einer Zufriedenheitsgarantie kannst Du den nächsten Schritt mit weniger Sorgen und vollem Vertrauen in Dein neues Ich gehen.
          </p>
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
          SECTION 6: BOTTOM LIGHT BLUE BANNER WITH CTA BUTTON (Deutsch)
          ========================================================================= */}
      <section className="w-full bg-[#C2E8FF] py-14 md:py-20 px-4 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <button
            onClick={handleCtaClick}
            type="button"
            className="group relative inline-flex flex-col items-center justify-center bg-[#F4BA43] hover:bg-[#ebaa32] active:bg-[#df9f27] text-black font-extrabold text-lg sm:text-xl md:text-[22px] px-8 sm:px-12 py-3.5 sm:py-4 md:py-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#e0a42f]/30 select-none"
            aria-label="Ja! Ich möchte die Lösung erfahren."
          >
            <span className="leading-tight tracking-tight">
              {config.ctaTextLine1 || 'Ja! Ich möchte die'}
            </span>
            <span className="leading-tight tracking-tight">
              {config.ctaTextLine2 || 'Lösung erfahren.'}
            </span>

            {/* Subtle glow / hover shine */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          BLANK FOOTER
          ========================================================================= */}
      <footer className="w-full bg-white py-12 md:py-16 mt-auto">
        <div className="max-w-4xl mx-auto px-4"></div>
      </footer>
    </div>
  );
}
