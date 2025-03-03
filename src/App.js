import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending...");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_URL/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setMessage(data.message || "Success!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to send data.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test1 - Google Apps Script API</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
