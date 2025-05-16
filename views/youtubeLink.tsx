"use client";
import React, { useState } from "react";

interface YouTubeEmbedProps {
  embedLink: string;
  thumbnailUrl: string; // 🔥 New prop for custom thumbnail
  topMargin?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ embedLink, thumbnailUrl, topMargin = "2rem" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for the iframe

  const getVideoId = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    } catch (err) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }
  };

  const videoId = getVideoId(embedLink);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  if (!videoId) {
    return <p className="text-center text-red-500 mt-4">Invalid YouTube URL</p>;
  }

  return (
    <div className="w-full md:w-2/3 mx-auto px-4" style={{ marginTop: topMargin }}>
      {isPlaying ? (
        <div className="relative">
          {/* Show loading spinner while iframe is loading */}
          {loading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <svg className="w-16 h-16  animate-spin" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 8.64v6.72L15.27 12 10 8.64z" />
                <path d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9zm2 0c0 6.08-4.93 11-11 11S1 18.08 1 12 5.93 1 12 1s11 4.93 11 11z" />
              </svg>
            </div>
          )}
          <iframe
            className="w-full rounded-lg shadow-lg"
            height="400"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={() => setLoading(false)} // Set loading to false once iframe is loaded
          />
        </div>
      ) : (
        <div
          onClick={() => setIsPlaying(true)}
          className="w-full h-[400px] rounded-lg shadow-lg relative cursor-pointer bg-cover bg-center"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${thumbnailUrl})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            imageRendering: 'auto',
          }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            {/* YouTube play button SVG */}
            <svg
              className="w-16 h-16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 8.64v6.72L15.27 12 10 8.64z" />
              <path d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9zm2 0c0 6.08-4.93 11-11 11S1 18.08 1 12 5.93 1 12 1s11 4.93 11 11z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;