import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ cityname: "" });
  const [savedId, setSavedId] = useState(null);
  const [apiData, setApiData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleViewClick = () => {
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSavedId(formData.cityname);
    const city = formData.cityname;
    fetch('https://api.api-ninjas.com/v1/airquality?city=' + city, {
      headers: { 'X-Api-Key': 'DcWv70Aa4ToqpUEZnKydqg==tfQdVSXuL2d4NpR2' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  return (
    <div className="App">
      <h2>Air Quality Information</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <label>Select City Name :</label>
          <select
            name="cityname"
            value={formData.cityname}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="London">London</option>
            <option value="New York">New York</option>
            <option value="Mexico">Mexico</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Moscow">Moscow</option>
            <option value="Paris">Paris</option>
            <option value="Venice">Venice</option>
            <option value="others">Others</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>

      {savedId && <p>Form Data: {savedId}</p>}

      <button onClick={handleViewClick} id="view">
        View Data
      </button>

      {apiData && (
        <div>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 
     
export default App;