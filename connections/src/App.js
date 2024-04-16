import {useState} from "react";
import Board from "./components/board";
import StartMenu from "./components/startMenu";
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
  const [startGame, setStartGame] = useState(false);

  const handlePlay = () => {
    console.log("START");
    setStartGame(true);
  };

  if (!startGame) {
    return (
      <div className="w-screen h-screen grid place-items-center text-center">
        <div className="flex flex-col justify-center items-center gap-y-6 aspect-square rounded-lg w-96 bg-gray-300">
          <div className="text-5xl place-self-start pt-5 font-bold">Welcome to Groups!</div>
          <div className="px-5 text-lg">A recreation of Connections by the New York Times</div>
          <button type="submit" className="bg-orange-400 w-20 h-10 rounded-xl" onClick={() => handlePlay()}>
            Play
          </button>
        </div>
      </div>
    );
  } else {
    return <Board />;
  }
}

export default App;
