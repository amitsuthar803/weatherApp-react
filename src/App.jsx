import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { WiStrongWind } from "react-icons/wi";
import { BsDropletFill } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("bangalore");
  const [searchTerm, setSearchTerm] = useState("bangalore");

  const KEY = `2883b8cee7fc4358bd277d8bfba3eb62`;

  const fetchWeatherData = () => {
    setLoading(true);
    const url = `https://api.weatherbit.io/v2.0/current?city=${searchTerm}&country=IN&key=${KEY}`;

    setError(null);

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeatherData();
  }, [searchTerm]);

  function handleSearch() {
    setSearchTerm(city);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-2 items-center justify-center  bg-slate-100 mt-[8rem]  rounded-[2rem] w-[30%] m-auto p-4">
      <div className="flex items-center  border-2 rounded-[2rem] w-[100%]">
        <input
          type="text"
          className=" outline-none p-1 px-3 rounded-l-[2rem] w-[100%]"
          onChange={(e) => setCity(e.target.value)}
          placeholder="enter city name here..."
        />
        <button
          className="h-[100%] p-2 bg-slate-200 rounded-r-[2rem]"
          onClick={handleSearch}
        >
          <LuSearch />
        </button>
      </div>
      <div className="flex flex-col w-[100%] px-1">
        <div className="flex justify-between ">
          <div className="font-semibold  text-slate-500">
            {data?.data[0].city_name}
          </div>
          <div className="font-semibold text-slate-500">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center font-semibold">
          <h2 className=" font-semibold text-[4rem]">
            {Math.round(data?.data[0].temp)}℃
          </h2>
          <p>{data?.data[0].weather.description}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center  gap-2">
              <WiStrongWind />
              {Math.round(data?.data[0].wind_spd * 3.6)} km/h
            </div>
            <div className="flex items-center gap-2">
              <BsDropletFill />
              {data?.data[0].precip}
            </div>
            <div className="flex items-center gap-2">
              <IoSunnySharp /> {data?.data[0].sunrise}
            </div>
          </div>
          <div>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`}
              alt={data.data[0].weather.description}
              className="w-24 h-24 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
