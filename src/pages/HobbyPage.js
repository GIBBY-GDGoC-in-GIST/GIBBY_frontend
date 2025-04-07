import React, { useState, useRef, useEffect } from 'react';

// List of activities
const activities = [
  "Drawing / Sketching",
  "Painting",
  "Photography",
  "Videography / Vlogging",
  "Graphic design",
  "Playing a musical instrument",
  "Writing / Poetry",
  "Acting / Theater",
  "Singing / Karaoke",
  "DIY crafts / Origami",
  "Digital art",
  "Fashion design",
  "Calligraphy",
  "Reading books",
  "Studying in groups",
  "Coding / Hackathons",
  "Debate",
  "Learning languages",
  "Chess",
  "Quiz nights",
  "Board games",
  "Public speaking",
  "Research projects",
  "Start-up brainstorming",
  "Journaling",
  "Blogging / Medium writing",
  "Gym workouts",
  "Running / Jogging",
  "Hiking",
  "Swimming",
  "Cycling",
  "Football",
  "Basketball",
  "Badminton",
  "Table tennis",
  "Martial arts",
  "Yoga / Meditation",
  "Dance classes",
  "Climbing",
  "Pilates",
  "Coding",
  "Game development",
  "Competitive programming",
  "Robotics",
  "Video games (e.g. FIFA, Valorant, LoL)",
  "VR / AR experiences",
  "Crypto trading",
  "Meme coin hunting",
  "Watching esports",
  "AI / ML projects",
  "Movie nights",
  "Clubbing / Partying",
  "Café hopping",
  "Food trips",
  "Travel / Day trips",
  "Volunteering",
  "Open mics",
  "Campus events",
  "Board game nights",
  "Theme park trips",
  "Escape rooms",
  "Playing cards (Uno, Mafia, etc.)",
  "Listening to music",
  "Watching anime / K-dramas / Netflix",
  "Playing instruments alone",
  "Walking in the park",
  "Stargazing",
  "Journaling",
  "Napping",
  "Podcast listening",
  "Gardening",
  "Window shopping"
];

const HobbyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  
  // References
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);

  // Load hobbies from localStorage on initial render
  useEffect(() => {
    const savedHobbies = JSON.parse(localStorage.getItem('selectedHobbies'));
    if (savedHobbies) {
      setSelectedHobbies(savedHobbies);
    }
  }, []);

  // Save hobbies to localStorage whenever they change
  useEffect(() => {
    if (selectedHobbies.length > 0) {
      localStorage.setItem('selectedHobbies', JSON.stringify(selectedHobbies));
    }
  }, [selectedHobbies]);

  // Handle click outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelectHobby = (hobby) => {
    if (!selectedHobbies.includes(hobby)) {
      setSelectedHobbies((prev) => [...prev, hobby]);
    }
    setDropdownOpen(false);
  };

  const handleRemoveHobby = (hobbyToRemove) => {
    setSelectedHobbies((prev) => prev.filter((hobby) => hobby !== hobbyToRemove));
  };

  const filteredActivities = activities.filter(hobby =>
    hobby.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Select Hobbies</h1>

        {/* Search Bar */}
        <input
          ref={searchInputRef}
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Search hobbies..."
          value={searchTerm}
          onFocus={() => setDropdownOpen(true)} // Open dropdown on focus
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Dropdown */}
        <div className="relative mb-4" ref={dropdownRef}>
          <button
            ref={buttonRef}
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on button click
            className="w-full p-3 bg-indigo-500 text-white rounded-lg text-left shadow-sm"
          >
            Click to choose a hobby
          </button>

          {dropdownOpen && (
            <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
              {filteredActivities.map((hobby, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectHobby(hobby)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {hobby}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Hobbies */}
        {selectedHobbies.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {selectedHobbies.map((hobby, index) => (
              <div
                key={index}
                className="flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
              >
                {hobby}
                <button
                  onClick={() => handleRemoveHobby(hobby)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HobbyPage;
