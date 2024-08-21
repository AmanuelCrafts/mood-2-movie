import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";
import SelectedMoodCard from "../components/SelectedMoodCard";

const MovieContainer = () => {
  const { emotion } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMoviesByEmotion = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              query: emotion,
              api_key: "3509c41a130f93452b1dd8c5a1d4c1fb",
              sort_by: "vote_average.aesc",
              include_adult: true,
            },
          }
        );
        setMovieList(response.data.results);
      } catch (error) {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByEmotion();
  }, [emotion]);

  const handleNext = () => {
    if (currentIndex < movieList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-6 px-10">
      <SelectedMoodCard mood={emotion.toLowerCase()} />
      {loading ? (
        <p className="px-4">Fetching movies based on your mood...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : movieList.length > 0 ? (
        <MovieList
          movieList={movieList}
          currentIndex={currentIndex}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ) : (
        <p className="px-4">
          We couldn't find any movies for the emotion: {emotion}. Try another
          mood.
        </p>
      )}
    </div>
  );
};

export default MovieContainer;
