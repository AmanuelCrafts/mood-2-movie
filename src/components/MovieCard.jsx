import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          {
            params: {
              api_key: import.meta.env.VITE_API_KEY,
            },
          }
        );
        const trailer = response.data.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailer) {
          setTrailerUrl(trailer.key);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <div className="max-w-lg bg-[#272935] shadow-lg rounded-lg overflow-hidden my-5">
      <div className="relative pb-[56.25%] overflow-hidden">
        {trailerUrl ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`}
            title={movie.title}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{movie.title}</h2>
        <p className="text-gray-400 mb-1">
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p
          className="text-gray-300 text-sm mt-3 overflow-hidden overflow-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
