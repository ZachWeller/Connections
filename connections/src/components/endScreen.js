export default function EndScreen(match) {
  <>
    <div className="grid place-content-center grid-cols-1 grid-rows-4 gap-2">
      <div className="bg-yellow-400 h-28 rounded-md mb-2 flex flex-col justify-center items-center px-20">
        <div className="font-bold text-lg">{match[0].reason.toUpperCase()}</div>
        <div className="flex flex-row gap-1">
          {match[0].words.map((word, idx) => (
            <div className="font-semibold">{idx === match[0].words.length - 1 ? word.toUpperCase() : `${word.toUpperCase()}, `}</div>
          ))}
        </div>
      </div>
      <div className="bg-green-400 h-28 rounded-md mb-2 flex flex-col justify-center items-center">
        <div className="font-bold text-lg">{match[1].reason.toUpperCase()}</div>
        <div className="flex flex-row gap-1">
          {match[0].words.map((word, idx) => (
            <div className="font-semibold">{idx === match[1].words.length - 1 ? word.toUpperCase() : `${word.toUpperCase()}, `}</div>
          ))}
        </div>
      </div>
      <div className="bg-blue-400 h-28 rounded-md mb-2 flex flex-col justify-center items-center">
        <div className="font-bold text-lg">{match[2].reason.toUpperCase()}</div>
        <div className="flex flex-row gap-1">
          {match[0].words.map((word, idx) => (
            <div className="font-semibold">{idx === match[2].words.length - 1 ? word.toUpperCase() : `${word.toUpperCase()}, `}</div>
          ))}
        </div>
      </div>
      <div className="bg-purple-400 h-28 rounded-md mb-2 flex flex-col justify-center items-center">
        <div className="font-bold text-lg">{match[3].reason.toUpperCase()}</div>
        <div className="flex flex-row gap-1">
          {match[0].words.map((word, idx) => (
            <div className="font-semibold">{idx === match[3].words.length - 1 ? word.toUpperCase() : `${word.toUpperCase()}, `}</div>
          ))}
        </div>
      </div>
    </div>
  </>;
}
