import React from "react";
import { useNavigate } from "react-router-dom";

const SelectedMoodCard = ({ mood }) => {
  const navigate = useNavigate();

  const handleEditMood = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#272935] shadow-lg rounded-lg overflow-hidden my-4">
      <div className="flex items-center justify-between px-10 md:px-20 py-4 gap-16 md:gap-40">
        <h2 className="text-lg md:text-xl font-bold text-white">
          Feeling {mood}
        </h2>
        <button onClick={handleEditMood} className="Btn">
          Edit Mood
        </button>
      </div>
    </div>
  );
};

export default SelectedMoodCard;
