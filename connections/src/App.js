import axios from "axios";
import {useEffect, useState} from "react";
// Have all solutions in objects grouped within an array
// Combine and Randomize the objects to then be mapped into the grid
// When user selects, fill the userList until full
// Once user hits submit, compare the userList to each object in the array
// If user has 3 out of 4 correct, tell the user
// Once the user successfully selects a correct group, combine each square into one rectangle and move to the first row
// Add a complete screen

// Future additions: Timer,

function App() {
  const [userObjects, setUserObjects] = useState([]);
  const [userList, setUserList] = useState([]);
  const [wordsObjects, setWordsObjects] = useState([]);
  const [wordsArray, setWordsArray] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/connections/words").then((response) => {
      setWordsObjects(response.data);
      const allWords = response.data.reduce((acc, obj) => acc.concat(obj.words), []);
      setWordsArray(shuffleArray(allWords));
    });
  }, []);

  const handleUserAddition = (value, index, e) => {
    let box = document.getElementById(index);

    if (userObjects.length <= 3 && !userObjects.includes(value)) {
      console.log("Atleast 1");

      setUserObjects((prev) => [...prev, value]);
      box.style.backgroundColor = "rgb(156 163 175 / 1)";
    } else if (userObjects.includes(value)) {
      let index = userObjects.indexOf(value);
      console.log(index);
      userObjects.splice(index, 1);
      box.style.backgroundColor = "rgb(209 213 219 / 1)";
    } else {
      return;
    }
  };

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  }

  const displayWords = (event) => {
    return (
      <>
        {wordsArray.map((item, index) => (
          <div
            className="w-28 bg-gray-300 rounded-md aspect-square grid place-items-center cursor-pointer hover:bg-gray-500 "
            onClick={(e) => handleUserAddition(item, index, e)}
            key={index}
            id={index}
          >
            {item}
          </div>
        ))}
      </>
    );
  };

  const handleSubmission = () => {
    if (userObjects.length !== 3) {
      console.log("Not filled");
      return;
    }
  };

  const handleDeselectAll = () => {};

  console.log(userObjects);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-10">
      <div className="text-5xl font-extralight">Groups</div>

      <div className="grid place-content-center grid-cols-4 grid-rows-4 gap-2">{wordsObjects.length > 0 && displayWords()}</div>
      <div className="flex gap-x-4">
        <button className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors">
          Submit
        </button>
        <button className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors">
          Deselect All
        </button>
        <button
          className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors"
          onClick={() => setWordsArray(shuffleArray(wordsArray))}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}

export default App;
