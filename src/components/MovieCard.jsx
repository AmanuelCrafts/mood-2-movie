import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          {
            params: {
              api_key: "3509c41a130f93452b1dd8c5a1d4c1fb",
            },
          }
        );
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        } else {
          setError("Trailer not available.");
        }
      } catch (error) {
        setError("Failed to fetch trailer.");
      } finally {
        setLoadingTrailer(false);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <div className="max-w-xl bg-[#272935] shadow-lg rounded-xl overflow-hidden my-10">
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        {loadingTrailer ? (
          <p className="text-center text-gray-500 py-4">Loading trailer...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-4">{error}</p>
        ) : trailerKey ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-center text-gray-500 py-4">No trailer available</p>
        )}
      </div>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4 text-white">{movie.title}</h2>
        <p className="text-gray-400 mb-2">
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p className="text-gray-400 mb-2">
          <strong>Rating:</strong> {movie.vote_average}
        </p>
        <p
          className="text-gray-300 text-base mt-3 overflow-hidden overflow-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
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
