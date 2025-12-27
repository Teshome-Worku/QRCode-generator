import QRCode from "react-qr-code";
import { useEffect, useState, useRef } from "react";
const App = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [notUrl, setNotUrl] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setEmpty("Please enter some value before generating QR code");
      setTimeout(() => {
        setEmpty("");
      }, 3000);
      return;
    }
    if(!value.startsWith("http://") && !value.startsWith("https://")){
      setNotUrl(true);
      setTimeout(()=>{
        setNotUrl(false);
        setValue("");
      },2000);
      return;

    } else {
      setNotUrl(false);
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    setSubmittedValue(value);
    timerRef.current = setTimeout(() => {
      setLoading(false);
      timerRef.current = null;
    }, 3000);
  };
  return (
    <div className="container">
      <h2>Generate QR Code</h2>
      <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter URL here"
        className="input"

      />
      {notUrl && <p className="error">Note: The entered value does not seem to be a valid URL.</p>}
      {empty && <p className="error">{empty}</p>}
      <button type="submit" disabled={loading}>Generate QR Code</button>

      </form>
      
      {loading && <p className="loading">Loading<span className="dots"></span></p>}
      {!loading && submittedValue && (
        <div className="qr-box">
          <QRCode value={submittedValue} />
        </div>
      )}
    </div>
  );
};
export default App;
