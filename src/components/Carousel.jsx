import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./MovieCard";

export default function Carousel({ items }) {
  const [current, setCurrent] = useState(0);
  const length = items.length;
  const intervalRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  // Auto-play slides every 5s
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  if (!Array.isArray(items) || length === 0) return null;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[current]?.id}
            className="absolute inset-0 flex justify-center items-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="w-full max-w-7xl px-4 md:px-8 lg:px-16">
              <MovieCard movie={items[current]} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white shadow-xl transition-all duration-300"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white shadow-xl transition-all duration-300"
        >
          &#10095;
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex mt-4 space-x-2 justify-center">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-red-500 scale-125" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
