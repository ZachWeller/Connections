export default function OneMatch({match, words, handleAddition}) {
  console.log(match);
  return (
    <>
      <div className="bg-yellow-400 h-28 rounded-md mb-2 flex flex-col justify-center items-center">
        <div className="font-bold text-lg">{match[0].reason.toUpperCase()}</div>
        <div className="flex flex-row gap-1">
          {match[0].words.map((word, idx) => (
            <div className="font-semibold">{idx === match[0].words.length - 1 ? word.toUpperCase() : `${word.toUpperCase()}, `}</div>
          ))}
        </div>
      </div>
      <div className="grid place-content-center grid-cols-4 grid-rows-3 gap-2">
        {words.map((item, index) => (
          <div
            className="w-28 bg-gray-300 rounded-md aspect-square grid place-items-center cursor-pointer hover:bg-gray-500 "
            onClick={(e) => handleAddition(item, index, e)}
            key={index}
            id={index}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}
