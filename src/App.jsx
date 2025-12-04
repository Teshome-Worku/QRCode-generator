import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
const App = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="container">
      <h2>React QR Code Generator</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text or link"
        className="input"
      />
      {loading && <p className="loading">Loading...</p>}
      {!loading && value && (
        <div className="qr-box">
          <QRCode value={value} />
        </div>
      )}
    </div>
  );
};
export default App;
