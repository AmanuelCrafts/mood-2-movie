import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movieList, currentIndex, onNext, onPrevious }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="gap-6">
        <MovieCard
          key={movieList[currentIndex].id}
          movie={movieList[currentIndex]}
        />
      </div>
      <div className="flex justify-between w-full max-w-md mt-4">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded ${
            currentIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#a526ff] hover:bg-[#8c20d4] text-white"
          }`}
        >
          ⬅️ Back
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === movieList.length - 1}
          className={`px-4 py-2 rounded ${
            currentIndex === movieList.length - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#a526ff] hover:bg-[#8c20d4] text-white"
          }`}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default MovieList;
