import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

const api = {
  key: "c2d10bbadbafdb4ed929067614bf9205",
  baseurl: "https://api.openweathermap.org/data/2.5/",
  // iconUrl: "https://openweathermap.org/img/wn/01d@2x.png",
};

function App() {
  const cityRef = useRef(null);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  function get(query) {
    query
      ? fetch(
          `${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`
        ).then((weather) => {
          displayResults(weather.json(), query);
        })
      : alert("Shaharni kirit iplos!");
  }

  function displayResults(weather, query) {
    if (weather.cod != "404") {
      console.log(weather);
      setData(weather);
      setShow(true);
      cityRef.current.value = "";
      const url = `https://api.unsplash.com/search/photos?query=${query} city&per_page=20&client_id=ZnBVi7bQCWPmMlPz-6oyGohuP2_rgrXifDaBRwfVMMw`;
      fetch(url)
        .then((images) => {
          return images.json();
        })
        .then((data) => {
          setImage(
            data.results[Math.round(Math.random() * data.results.length)].urls
              .full
          );
          // console.log(data.results[0].urls.full);
        });
    } else {
      alert(weather.message);
      cityRef.current.value = "";
      setShow(false);
    }
  }
  // console.log(data);
  const weather = data.weather ? data.weather[0] : "";
  // console.log(weather);
  return (
    <div
      className="App"
      style={{
        background: `url(${
          image
            ? image
            : "https://pro-dachnikov.com/uploads/posts/2021-09/1632874879_12-pro-dachnikov-com-p-dom-na-gore-v-shveitsarii-foto-12.jpg"
        })`,
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // objectFit: "cover",
      }}
    >
      <div className="main-card">
        <div>
          <input type="text" placeholder="Search..." ref={cityRef} />
          <button onClick={() => get(cityRef.current.value)}>🔍</button>
        </div>
        {data.cod != "404" ? (
          <div className="weather-data">
            <h1>
              {data.name}, {data.sys.country}
            </h1>
            <p>
              {new Date().getDate()}.{new Date().getMonth() + 1}.
              {new Date().getFullYear()}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=""
            />
            <h1>
              {Math.round(data.main.temp)}°C, {data.weather[0].main}
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
