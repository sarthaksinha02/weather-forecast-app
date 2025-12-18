import { useState } from "react"
import axios from "axios"
import {
  FaSearch,
  FaTemperatureHigh,
  FaWind,
  FaTint,
  FaMapMarkerAlt
} from "react-icons/fa"
import {
  WiDaySunny,
  WiCloudy,
  WiDayCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog
} from "react-icons/wi"

export default function WeatherCard() {
  const [city, setCity] = useState("")
  const [data, setData] = useState(null)

  const fetchWeather = async () => {
  if (!city.trim()) return

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    )
    setData(res.data)
  } catch (error) {
    if (error.response?.status === 404) {
      alert("City not found. Please enter a valid city name.")
    } else if (error.response?.status === 401) {
      alert("Invalid API key. Please check your API key.")
    } else {
      alert("Something went wrong. Please try again later.")
    }
  }
}


  const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return <WiDaySunny className="text-yellow-400" />
    case "Clouds":
      return <WiDayCloudy className="text-slate-300" />
    case "Rain":
      return <WiRain className="text-blue-400" />
    case "Snow":
      return <WiSnow className="text-cyan-200" />
    case "Thunderstorm":
      return <WiThunderstorm className="text-purple-400" />
    case "Mist":
    case "Fog":
    case "Haze":
      return <WiFog className="text-slate-400" />
    default:
      return <WiCloudy className="text-slate-300" />
  }
}


  return (
    <div className="relative w-[420px] md:w-[1000px] rounded-[2.5rem] p-8 bg-gradient-to-br from-black/60 via-slate-900/60 to-indigo-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(56,189,248,0.25)]">

      {/* GLOW RINGS */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl" />

      {/* TITLE */}
      <h1 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide mb-8 bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
        ⚡ Weather
      </h1>

      {/* SEARCH */}
      <div className="flex items-center gap-3 mb-10">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather()
            }
          }}
          placeholder="Enter city name"
          className="flex-1 px-6 py-4 uppercase rounded-2xl bg-white/10 text-lg text-white placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <button
          onClick={fetchWeather}
          className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 hover:scale-110 transition-all duration-300 shadow-xl"
        >
          <FaSearch className="text-xl" />
        </button>
      </div>

      {/* WEATHER DATA */}
      {data && (
        <div className="text-center space-y-8 ">

          {/* CITY */}
          <div className="flex justify-center items-center gap-2 text-2xl md:text-3xl font-semibold">
            <FaMapMarkerAlt className="text-cyan-400" />
            {data.name}
          </div>

          {/* TEMP + WEATHER ICON */}
          <div className="flex justify-center items-center gap-6 text-6xl md:text-7xl font-black">
            
            <div className="text-7xl md:text-8xl animate-pulse">
              {getWeatherIcon(data.weather[0].main)}
            </div>

            <div className="flex items-end gap-1">
              {Math.round(data.main.temp)}°
              <span className="text-3xl md:text-4xl opacity-70">C</span>
            </div>

          </div>

          {/* CONDITION TEXT */}
          <p className="uppercase tracking-widest text-sm opacity-70">
            {data.weather[0].description}
          </p>


          {/* STATS */}
          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="rounded-2xl bg-white/10 p-6 flex flex-col items-center gap-2 hover:scale-105 transition">
              <FaTint className="text-3xl text-cyan-400" />
              <span className="text-2xl font-bold">
                {data.main.humidity}%
              </span>
              <span className="uppercase text-xs tracking-widest opacity-60">
                Humidity
              </span>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 flex flex-col items-center gap-2 hover:scale-105 transition">
              <FaWind className="text-3xl text-indigo-400" />
              <span className="text-2xl font-bold">
                {data.wind.speed}
              </span>
              <span className="uppercase text-xs tracking-widest opacity-60">
                Wind km/h
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
