import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  onOpenSettings?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  onOpenSettings,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Helper to convert various YouTube / video URL formats or raw iframe to standard embed URL
  const getEmbedUrl = (url: string): { type: 'youtube' | 'vimeo' | 'mp4' | 'iframe'; src: string } => {
    if (!url || url.trim() === '') {
      return { type: 'youtube', src: '' };
    }

    let trimmed = url.trim();

    // Check if user pasted an entire <iframe> string
    const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (iframeSrcMatch && iframeSrcMatch[1]) {
      trimmed = iframeSrcMatch[1];
    }

    // Direct embed URL already provided
    if (trimmed.includes('youtube.com/embed/')) {
      return {
        type: 'youtube',
        src: trimmed,
      };
    }

    // YouTube formats
    const ytMatch = trimmed.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      };
    }

    // Vimeo format
    const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[3]) {
      return {
        type: 'vimeo',
        src: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
      };
    }

    // Direct MP4 / WebM
    if (trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.endsWith('.ogg')) {
      return {
        type: 'mp4',
        src: trimmed,
      };
    }

    // Default iframe fallback
    return {
      type: 'iframe',
      src: trimmed,
    };
  };

  const parsedVideo = getEmbedUrl(videoUrl);
  const hasValidVideo = Boolean(parsedVideo.src && parsedVideo.src.trim() !== '');

  return (
    <div className="w-full max-w-[840px] mx-auto px-4">
      <div className="relative aspect-video w-full rounded-md overflow-hidden bg-black shadow-xl group border border-gray-100">
        {hasValidVideo ? (
          parsedVideo.type === 'mp4' ? (
            <video
              src={parsedVideo.src}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={parsedVideo.src}
              title="YouTube video player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )
        ) : !isPlaying ? (
          <div
            className="relative w-full h-full cursor-pointer overflow-hidden select-none"
            onClick={() => setIsPlaying(true)}
            title="Click to play video"
          >
            {/* High-res authentic screenshot thumbnail */}
            <img
              src={thumbnailUrl || '/assets/video_thumbnail.png'}
              alt="SlimSana Reviews and Presentation"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

            {/* Central YouTube style Red Play Button */}
            <button
              type="button"
              aria-label="Play video"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-11 md:w-20 md:h-14 bg-[#FF0000] hover:bg-[#CC0000] rounded-xl flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95"
            >
              <Play className="w-6 h-6 md:w-8 md:h-8 fill-current translate-x-0.5 text-white" />
            </button>

            {/* Bottom YouTube style indicator */}
            <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs px-2.5 py-1 rounded flex items-center gap-1.5 backdrop-blur-sm pointer-events-none opacity-90">
              <span className="font-medium text-[11px]">Watch Presentation</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative bg-gray-900 flex flex-col items-center justify-center text-white p-6 text-center">
            <div className="max-w-md bg-gray-800/90 border border-gray-700 p-6 rounded-2xl shadow-2xl backdrop-blur-md">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Video Presentation</h3>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                Click play or configure your video URL in settings to watch.
              </p>
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Configure Video
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
