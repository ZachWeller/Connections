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
  const [userList, setUserList] = useState([]);
  const [wordsList, setWordsList] = useState([]);
  useEffect(() => {
    axios.get("/connections/words").then((response) => setWordsList(response.results));
  }, []);

  console.log(wordsList);

  const handleUserAddition = (value, div) => {
    console.log(div);
    if (userList.length <= 3 && !userList.includes(value)) {
      setUserList((prev) => [...prev, value]);
      // div.classList.add("bg-gray-500");
    } else if (userList.includes(value)) {
      let index = userList.indexOf(value);
      userList.splice(index, 1);
      console.log(userList);
    } else {
      return;
    }
  };

  console.log(userList);

  let placeholder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-10">
      <div className="text-5xl font-extralight">Groups</div>
      <div className="grid place-content-center grid-cols-4 grid-rows-4 gap-2">
        {placeholder.map((index, key) => (
          <div
            className="w-28 bg-gray-300 rounded-md aspect-square grid place-items-center cursor-pointer hover:bg-gray-400"
            onClick={(e) => handleUserAddition(index, e)}
            key={key}
            value={1}
          >
            {index}
          </div>
        ))}
      </div>
      <div className="flex gap-x-4">
        <button className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors">
          Submit
        </button>
        <button className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors">
          Deselect All
        </button>
        <button className="border-2 border-gray-500 rounded-full px-3 py-2 font-semibold text-gray-800 hover:bg-gray-500 hover:text-white hover:transition-colors">
          Shuffle
        </button>
      </div>
    </div>
  );
}

export default App;
