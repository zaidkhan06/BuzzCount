import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Minus, RotateCcw } from "lucide-react";
import BlurryToast from "./BlurryToast";

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved !== null ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  const playSound = () => {
    const audio = new Audio("/pop.wav");
    audio.volume = 0.5;
    audio.play().catch((err) => console.error("Sound error:", err));
  };

  const showCustomToast = (msg) => {
    playSound();
    toast(<BlurryToast message={msg} />, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const increment = () => {
    if (count >= 1000000) {
      showCustomToast("🚫 Maximum limit reached (1,000,000)");
      return;
    }
    setCount(count + 1);
  };

  const decrement = () => {
    if (count <= 0) {
      showCustomToast("🚫 Count can't go below 0");
      return;
    }
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
    showCustomToast("Counter Reset!");
  };

  return (
    <div className="relative w-full min-h-lvh flex items-center justify-center overflow-hidden">
      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Main Counter Box */}
      <div
        className="w-64 h-80 md:w-[400px] md:h-[440px]
        flex flex-col justify-evenly items-center
        rounded-xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20"
      >
        <h1 className="text-3xl md:text-4xl text-white font-bold animate-pulse">
          BuzzCount
        </h1>

        <h3 className="text-white font-bold text-6xl md:text-8xl">{count}</h3>

        <div className="flex justify-evenly items-center w-full px-4">
          {/* Increment Button */}
          <button
            aria-label="Increment counter"
            onClick={increment}
            className="bg-green-400 hover:bg-green-500 w-14 h-8 md:w-18 md:h-12 
            rounded text-white font-bold cursor-pointer hover:scale-105 transition-all duration-200 
            flex items-center justify-center"
          >
            <Plus size={24} />
            <span className="sr-only">Increment</span>
          </button>

          {/* Decrement Button */}
          <button
            aria-label="Decrement counter"
            onClick={decrement}
            className="bg-red-400 hover:bg-red-500 w-14 h-8 md:w-18 md:h-12 
            rounded text-white font-bold cursor-pointer hover:scale-105 transition-all duration-200 
            flex items-center justify-center"
          >
            <Minus size={24} />
            <span className="sr-only">Decrement</span>
          </button>

          {/* Reset Button */}
          <button
            aria-label="Reset counter to zero"
            onClick={reset}
            className="bg-blue-400 hover:bg-blue-500 w-14 h-8 md:w-18 md:h-12 
            rounded text-white font-bold cursor-pointer hover:scale-105 transition-all duration-200 
            flex items-center justify-center"
          >
            <RotateCcw size={22} />
            <span className="sr-only">Reset</span>
          </button>
        </div>
        <footer className="">
          <p className="text-sm text-gray-200">Made with ❤️ by Zaid Khan</p>
        </footer>
      </div>

      {/* 🔹 Toast Container */}
      <ToastContainer
        toastClassName="!bg-white/10 w-fit sm:max-w-[360px]  max-w-[100vw] !flex !item-center !justify-center !backdrop-blur-md !border !border-white/20 !shadow-md !text-white !rounded-xl "
        bodyClassName="text-sm font-semibold"
        closeButton={true}
      />
    </div>
  );
}

export default App;
