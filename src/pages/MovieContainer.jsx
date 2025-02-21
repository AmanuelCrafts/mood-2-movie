import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";
import SelectedMoodCard from "../components/SelectedMoodCard";

const moodToGenreMap = {
  "😊 HAPPY": "35", // Comedy
  "😢 SAD": "18", // Drama
  "😠 ANGRY": "28", // Action
  "😆 EXCITED": "12", // Adventure
  "😌 RELAXED": "10749", // Romance
  "😐 BORED": "16", // Animation
  "😲 SURPRISED": "14", // Fantasy
  "😬 NERVOUS": "9648", // Mystery
  "😨 SCARED": "27", // Horror
  "😎 CONFIDENT": "878", // Sci-Fi
  "😔 LONELY": "10752", // War
  "😍 IN LOVE": "10749", // Romance
  "😕 CONFUSED": "53", // Thriller
  "😤 DETERMINED": "28", // Action
  "😏 PROUD": "36", // History
  "🙏 GRATEFUL": "37", // Western
  "🤞 HOPEFUL": "10770", // TV Movie
};

const MovieContainer = () => {
  const { emotion, genre } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const genreId = moodToGenreMap[emotion] || "35"; // Default to Comedy if mood is not found

  useEffect(() => {
    const fetchMoviesByEmotionAndGenre = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: "3509c41a130f93452b1dd8c5a1d4c1fb",
              sort_by: "vote_average.desc",
              with_genres: genreId, // Use genre ID
              include_adult: false,
            },
          }
        );
        setMovieList(response.data.results);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByEmotionAndGenre();
  }, [emotion, genreId]);

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
    <div className="w-full flex flex-col items-center gap-6 py-6 px-10">
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
          We couldn&apos;t find any movies for the emotion: {emotion}. Try
          another mood.
        </p>
      )}
    </div>
  );
};

export default MovieContainer;
