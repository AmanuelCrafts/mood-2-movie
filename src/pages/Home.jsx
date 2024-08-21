import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectedMoodCard from "../components/SelectedMoodCard";

const Home = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const navigate = useNavigate();

  const emotions = [
    { emoji: "😊", name: "HAPPY", keyword: "comedy" },
    { emoji: "😢", name: "SAD", keyword: "drama" },
    { emoji: "😠", name: "ANGRY", keyword: "action" },
    { emoji: "😆", name: "EXCITED", keyword: "adventure" },
    { emoji: "😌", name: "RELAXED", keyword: "romance" },
    { emoji: "😐", name: "BORED", keyword: "thriller" },
    { emoji: "😲", name: "SURPRISED", keyword: "mystery" },
    { emoji: "😬", name: "NERVOUS", keyword: "horror" },
    { emoji: "😨", name: "SCARED", keyword: "horror" },
    { emoji: "😎", name: "CONFIDENT", keyword: "crime" },
    { emoji: "😔", name: "LONELY", keyword: "drama" },
    { emoji: "😍", name: "IN LOVE", keyword: "romance" },
    { emoji: "😕", name: "CONFUSED", keyword: "mystery" },
    { emoji: "😤", name: "DETERMINED", keyword: "action" },
    { emoji: "😏", name: "PROUD", keyword: "biography" },
    { emoji: "🙏", name: "GRATEFUL", keyword: "family" },
    { emoji: "🤞", name: "HOPEFUL", keyword: "fantasy" },
  ];

  const handleEmotionClick = (emotion) => {
    setCurrentMood(emotion);
    navigate(`/movies/${emotion.keyword}`); // Navigate using keyword
  };

  useEffect(() => {
    document.title = "Home - Mood to Movies";
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-6">
      <div className="w-full px-10 md:px-40 lg:px-64 flex flex-col gap-4">
        <h1 className="text-4xl lg:text-6xl text-center font-black">
          Discover top-rated Movies based on your mood
        </h1>
        <p className="text-xl text-center">How are you feeling now?</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-4">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            onClick={() => handleEmotionClick(emotion)}
            className="Btn"
          >
            {emotion.emoji} {emotion.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
