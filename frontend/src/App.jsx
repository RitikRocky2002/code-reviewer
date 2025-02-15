import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");

  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    const response = await axios.post(`http://localhost:3000/ai/get-review`, {
      code,
    });

    setReview(response.data);
  }
  return (
    <>
      <header className="header">
        <h1>CodeReviewer</h1>
      </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: ' "Fira code", "Fira Mono", monospace ',
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
              placeholder="Enter your code here..."
            />
          </div>
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
      <footer className="footer">
        <p>© 2025 CodeReviewer | Built with ❤️</p>
      </footer>
    </>
  );
}

export default App;
