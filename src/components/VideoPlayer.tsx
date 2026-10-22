import React, { useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
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
        src: `https://www.youtube.com/embed/${ytMatch[1]}`,
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

  // Add autoplay parameter when user initiates play
  const getAutoplayUrl = (src: string) => {
    if (!src) return '';
    if (src.includes('autoplay=')) return src;
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}autoplay=1`;
  };

  return (
    <div className="w-full max-w-[840px] mx-auto px-4">
      <div className="relative aspect-video w-full rounded-md overflow-hidden bg-[#083A1A] shadow-xl group border border-gray-100">
        {!isPlaying ? (
          <div
            className="relative w-full h-full cursor-pointer overflow-hidden select-none bg-[#083A1A] flex items-center justify-center"
            onClick={() => setIsPlaying(true)}
            title="Klicken zum Abspielen"
          >
            {/* Uncropped competition webp banner image */}
            <img
              src={thumbnailUrl || '/assets/video_banner_competition.webp'}
              alt="SlimSana vs. the competition"
              className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
        ) : (
          <div className="w-full h-full relative bg-black">
            {hasValidVideo ? (
              parsedVideo.type === 'mp4' ? (
                <video
                  src={parsedVideo.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getAutoplayUrl(parsedVideo.src)}
                  title="YouTube video player"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )
            ) : (
              <div className="w-full h-full relative bg-gray-900 flex flex-col items-center justify-center text-white p-6 text-center">
                <p className="text-sm text-gray-300">Video nicht verfügbar.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
