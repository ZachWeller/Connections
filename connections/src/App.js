import axios from "axios";
import {useEffect, useState} from "react";
// Have all solutions in objects grouped within an array - Done
// Combine and Randomize the objects to then be mapped into the grid - Done
// When user selects, fill the userList until full - Done
// Once user hits submit, compare the userList to each object in the array
// If user has 3 out of 4 correct, tell the user
// Add Lives, 4 of them
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
      // reduces the response to gather the accumulative and then create array filled with just the words
      const allWords = response.data.reduce((acc, obj) => acc.concat(obj.words), []);
      setWordsArray(shuffleArray(allWords));
    });
  }, []);

  const handleUserAddition = (value, index, e) => {
    // Div of the clicked box
    let box = document.getElementById(index);

    // If the user has not filled the array and the value is not inside of the array, add it.
    if (userList.length <= 3 && !userList.includes(value)) {
      setUserList((prev) => [...prev, value]);
      setUserObjects((prev) => [
        ...prev,
        {
          word: value,
          id: index,
        },
      ]);
      box.style.backgroundColor = "rgb(156 163 175 / 1)";
    } else if (userList.includes(value)) {
      // Finds the object index that contains the value
      let index = userObjects
        .map((obj) => {
          return obj.word;
        })
        .indexOf(value);

      // Since the index is the same for both useStates, reuse the same index to remove the value
      userObjects.splice(index, 1);
      userList.splice(index, 1);

      box.style.backgroundColor = "rgb(209 213 219 / 1)";
    } else {
      return;
    }
  };

  function shuffleArray(array) {
    // Created a new variable so that the useState is rerendered when shuffled
    const shuffledArray = [...array];
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  }

  // Grid of boxes
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
    console.log(userObjects.length);

    if (userObjects.length === 4) {
      // Compare userList to each WordObjects
      // If user is wrong, remove a life
      // If user is off by one, tell the user otherwise say shake selected boxes and remove a life
      // If user is correct, merge boxes and move to the top and display the reason
      return;
    } else {
      // Tell user to add another one
    }
  };

  // Grabs each index within the userObject and removes them, also removes the styling of each box
  const handleDeselectAll = () => {
    setUserObjects([]);
    setUserList([]);
    userObjects.forEach((item) => {
      document.getElementById(item.id).style.backgroundColor = "rgb(209 213 219 / 1)";
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-10">
      <div className="text-5xl font-extralight">Groups</div>

      <div className="grid place-content-center grid-cols-4 grid-rows-4 gap-2">{wordsObjects.length > 0 && displayWords()}</div>
      <div className="flex gap-x-4">
        <button
          className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors"
          onClick={handleSubmission()}
        >
          Submit
        </button>
        <button
          className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors"
          onClick={() => handleDeselectAll()}
        >
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
