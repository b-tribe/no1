import { useState } from "react";
import Bracket from "../components/Bracket";

export default function Home() {
  const [step, setStep] = useState<"config"|"input"|"bracket">("config");
  const [count, setCount] = useState(8);
  const [names, setNames] = useState<string[]>([]);

  return (
    <main className="min-h-screen p-8">
      {step === "config" && (
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-bold">トーナメント設定</h1>
          <select
            className="w-full p-2 border rounded"
            value={count}
            onChange={e => setCount(+e.target.value)}
          >
            {[2,4,8,16,32].map(n => (
              <option key={n} value={n}>{n} チーム</option>
            ))}
          </select>
          <button
            className="w-full py-2 bg-primary text-white rounded-lg"
            onClick={() => { setNames(Array(count).fill("")); setStep("input"); }}
          >
            チーム名を入力
          </button>
        </div>
      )}

      {step === "input" && (
        <div className="max-w-lg mx-auto space-y-2">
          <h2 className="text-xl font-semibold">チーム名入力</h2>
          {names.map((n, i) => (
            <input
              key={i}
              className="w-full p-2 border rounded"
              placeholder={`チーム ${i+1}`}
              value={names[i]}
              onChange={e => {
                const arr = [...names];
                arr[i] = e.target.value;
                setNames(arr);
              }}
            />
          ))}
          <button
            className="mt-4 w-full py-2 bg-accent text-white rounded-lg"
            onClick={() => setStep("bracket")}
            disabled={names.some(n => !n.trim())}
          >
            開始
          </button>
        </div>
      )}

      {step === "bracket" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">トーナメント表</h2>
          <Bracket teams={names} />
        </div>
      )}
    </main>
);
}
