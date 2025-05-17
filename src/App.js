
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from "axios";

const themes = {
  light: {
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  dark: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff"
  },
  fun: {
    backgroundColor: "#ffe0f0",
    color: "#ff00cc",
    fontFamily: "'Comic Neue', Comic Sans MS, cursive"
  }
};

const templates = {
  print: `print("Hello, world!")`,
  input: `name = input("Enter your name: ")\nprint("Hello", name)`,
  loop: `for i in range(5):\n    print("Iteration:", i)`
};

function App() {
  const [code, setCode] = useState("print('Hello, world!')");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("light");

  const handleRun = async () => {
    try {
      const res = await axios.post("http://localhost:5000/run", {
        code,
        input
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  const insertTemplate = (templateKey) => {
    setCode(templates[templateKey]);
  };

  const currentTheme = themes[theme];

  return (
    <div style={{ padding: "20px", minHeight: "100vh", ...currentTheme }}>
      <h1>🧑‍💻 Python Online Code Editor</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>
          🎨 Choose Theme: &nbsp;
          <select onChange={(e) => setTheme(e.target.value)} value={theme}>
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="fun">🎉 Fun</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        🧩 Insert Template: &nbsp;
        <button onClick={() => insertTemplate("print")}>🖨️ Print</button>
        <button onClick={() => insertTemplate("input")}>🔢 Input</button>
        <button onClick={() => insertTemplate("loop")}>🔁 Loop</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
  💡 <button onClick={() => alert(`
Tips for Beginners:
✅ Use print("...") with quotes
✅ Check indentation (spaces before lines)
✅ Always match parentheses ()
✅ Input is always a string – use int(input()) if needed
✅ Use Run button after editing code
`)}>
    💡 Show Hints
  </button>
</div>


      <Editor
        height="300px"
        defaultLanguage="python"
        value={code}
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={(newCode) => setCode(newCode)}
      />
      <div style={{ marginTop: "10px" }}>
  <button onClick={() => localStorage.setItem("savedCode", code)}>💾 Save Code</button>
  <button onClick={() => setCode(localStorage.getItem("savedCode") || "")}>📂 Load Code</button>
</div>


      <textarea
        placeholder="Enter input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: "60px", marginTop: "10px", ...currentTheme }}
      />

      <button onClick={handleRun} style={{ marginTop: "10px", padding: "10px" }}>
        ▶️ Run Code
      </button>

      <pre style={{ background: "#f0f0f0", padding: "10px", marginTop: "10px" }}>
        {output}
      </pre>
    </div>
  );
}

export default App;
