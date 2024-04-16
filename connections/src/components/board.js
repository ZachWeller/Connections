import axios from "axios";
import {useEffect, useState} from "react";
import EndScreen from "./endScreen";
import OneMatch from "./oneMatch";
import ThreeMatch from "./threeMatch";
import TwoMatch from "./twoMatch";
export default function Board() {
  const [objectsOfUserSelectedWords, setObjectsOfUserSelectedWords] = useState([]);
  const [userSelectedWords, setUserSelectedWords] = useState([]);
  const [wordsAndReason, setWordsAndReasons] = useState([]);
  const [displayWords, setDisplayWords] = useState([]);
  const [amountOfMatches, setAmountOfMatches] = useState(0);
  const [arrayOfMatches, setArrayOfMatches] = useState([]);
  const [lives, setLives] = useState(4);
  const [alreadySelectedGroups, setAlreadySelectedGroups] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/connections/words").then((response) => {
      setWordsAndReasons(response.data);
      // reduces the response to gather the accumulative and then create array filled with just the words
      const allWords = response.data.reduce((acc, obj) => acc.concat(obj.words), []);
      setDisplayWords(shuffleArray(allWords));
    });
  }, []);
  const handleUserAddition = (value, index) => {
    let box = document.getElementById(index);
    // If the user has not filled the array and the value is not inside of the array, add it.
    if (userSelectedWords.length <= 3 && !userSelectedWords.includes(value)) {
      setUserSelectedWords((prev) => [...prev, value]);
      setObjectsOfUserSelectedWords((prev) => [
        ...prev,
        {
          word: value,
          id: index,
        },
      ]);
      box.classList.add("bg-gray-500");
    } else if (userSelectedWords.includes(value)) {
      // Finds the object index that contains the value
      let objectIndex = objectsOfUserSelectedWords
        .map((obj) => {
          return obj.word;
        })
        .indexOf(value);
      let arrayIndex = userSelectedWords.indexOf(value);
      // Since the index is the same for both useStates, reuse the same index to remove the value
      objectsOfUserSelectedWords.splice(objectIndex, 1);
      userSelectedWords.splice(arrayIndex, 1);
      box.classList.remove("bg-gray-500");
    } else {
      return;
    }
  };
  // Grabs each index within the userObject and removes them, also removes the styling of each box
  const handleDeselectAll = () => {
    if (userSelectedWords.length > 0 && lives > 0) {
      setObjectsOfUserSelectedWords([]);
      setUserSelectedWords([]);
      objectsOfUserSelectedWords.forEach((item) => {
        document.getElementById(item.id).classList.remove("bg-gray-500");
      });
    } else {
      return;
    }
  };
  function shuffleArray(array) {
    // Created a new variable so that the useState is rerendered when shuffled
    handleDeselectAll();
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
  const board = () => {
    if (amountOfMatches === 0) {
      return (
        <div className="grid place-content-center grid-cols-4 grid-rows-4 gap-2">
          {displayWords.map((item, index) => (
            <div
              className="w-28 bg-gray-300 rounded-md aspect-square grid place-items-center cursor-pointer max-w-full hover:bg-gray-500 "
              onClick={(e) => handleUserAddition(item, index, e)}
              key={index}
              id={index}
            >
              {item}
            </div>
          ))}
        </div>
      );
    }
    if (amountOfMatches === 1) {
      return <OneMatch match={arrayOfMatches} words={displayWords} handleAddition={handleUserAddition} />;
    }
    if (amountOfMatches === 2) {
      return <TwoMatch match={arrayOfMatches} words={displayWords} handleAddition={handleUserAddition} />;
    }
    if (amountOfMatches === 3) {
      return <ThreeMatch match={arrayOfMatches} words={displayWords} handleAddition={handleUserAddition} />;
    }
    if (amountOfMatches === 4) {
      return <EndScreen match={arrayOfMatches} />;
    }
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (userSelectedWords.length < 4) {
      console.log("add one more");
      return;
    }
    console.log(alreadyGuessed());
    if (alreadyGuessed()) {
      console.log("already guessed");
      return;
    }
    if (!alreadyGuessed()) {
      // For each object we set a correct count to start at 0, after we loop through each word array within
      // the object and we see if that word is within the user list and then increase the correct count
      // Short term: have a correct count for each word array and check if each word is within the user list
      let success = false;
      wordsAndReason.forEach((obj) => {
        let correctCount = 0;
        obj.words.forEach((word) => {
          if (userSelectedWords.includes(word)) {
            correctCount++;
          }
        });
        if (correctCount === 4) {
          success = true;
          setAmountOfMatches(amountOfMatches + 1);
          userSelectedWords.forEach((word) => {
            let index = displayWords.indexOf(word);
            displayWords.splice(index, 1);
            objectsOfUserSelectedWords.splice(index, 1);
          });
          setUserSelectedWords([]);
          setObjectsOfUserSelectedWords([]);
          setArrayOfMatches((prev) => [...prev, obj]);
        }
        if (correctCount === 3) {
          console.log("One away!");
        }
      });
      if (success === false) {
        handleIncorrectInput();
      }
    }
  };
  const alreadyGuessed = () => {
    let success;
    userSelectedWords.sort();
    if (alreadySelectedGroups.length < 1) {
      setAlreadySelectedGroups((prev) => [...prev, userSelectedWords]);
      return false;
    } else {
      alreadySelectedGroups.forEach((group) => {
        console.log(JSON.stringify(group), JSON.stringify(userSelectedWords));
        if (JSON.stringify(group) === JSON.stringify(userSelectedWords)) {
          success = true;
        } else {
          setAlreadySelectedGroups((prev) => [...prev, userSelectedWords]);
          success = false;
        }
      });
      return success;
    }
  };
  const handleLives = () => {
    if (lives === 4) {
      return (
        <div className="flex gap-1">
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        </div>
      );
    }
    if (lives === 3) {
      return (
        <div className="flex gap-1">
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        </div>
      );
    }
    if (lives === 2) {
      return (
        <div className="flex gap-1">
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        </div>
      );
    }
    if (lives === 1) {
      return (
        <div className="flex gap-1">
          <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        </div>
      );
    }
  };

  const handleIncorrectInput = () => {
    setLives(lives - 1);
    for (let i = 0; i < displayWords.length; i++) {
      let boxes = document.getElementById(i);
      boxes.classList.add("animate-[shake_.1s_ease-in-out]");
      setTimeout(() => {
        boxes.classList.remove("animate-[shake_.1s_ease-in-out]");
      }, "1000");
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-y-10">
        <div className="text-5xl font-extralight">Groups</div>
        <div className="max-w-screen-sm px-4">{wordsAndReason.length > 0 && lives > 0 && board()}</div>
        <div className="grid text-center place-items-center">
          <div>Mistakes Remaining</div>
          <div>{handleLives()}</div>
        </div>
        {arrayOfMatches.length < 4 && (
          <div className="flex gap-x-4">
            <button
              className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors"
              onClick={(e) => handleSubmission(e)}
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
              onClick={() => setDisplayWords(shuffleArray(displayWords))}
            >
              Shuffle
            </button>
          </div>
        )}
        {arrayOfMatches.length === 4 && (
          <button className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors">
            Back
          </button>
        )}
      </div>
    </>
  );
}
