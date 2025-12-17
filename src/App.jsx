import WeatherCard from "./components/WeatherCard"

export default function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 text-white">

      {/* BACKGROUND ANIMATED TEXT */}
      <h1 className="absolute text-[10vw] md:text-[8vw] font-extrabold uppercase tracking-widest
        text-white/5 select-none pointer-events-none
        animate-bgText">
        Weather Forecast App
      </h1>

      {/* WEATHER CARD */}
      <div className="relative z-10">
        <WeatherCard />
      </div>

    </div>
  )
}
