/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const PasswordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";

    if (numbers) {
      str += "123456789";
    }
    if (char) {
      str += "!@#$%^&*(){}:|~`><?";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, char, setPassword]);

  const ShowCopyMessage = () => {
    alert("Copied !");
  };

  const CopyPassword = useCallback(() => {
    ShowCopyMessage();
    PasswordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, char, setPassword]);

  return (
    <div className="container w-full max-w-md my-8 shadow-sm rounded-lg px-4 mx-8 bg-gray-700 text-orange-600">
      <h1 className="text-xl my-4">Password Generator</h1>
      <div className="flex">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 rounded-md"
          placeholder="password"
          readOnly
          ref={PasswordRef}
        />
        <button
          className="outline-none text-white px-3 py-0.5 shrink-0 bg-blue-500"
          onClick={CopyPassword}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numbers}
            className="cursor-pointer"
            onChange={() => {
              setNumbers((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={char}
            className="cursor-pointer"
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
