"use client";
import React, { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { LiaTelegramPlane } from "react-icons/lia";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    let videoTimeout: any;
    videoTimeout = setTimeout(() => {
      setIsMuted(false);
    }, 200);

    return () => {
      clearTimeout(videoTimeout);
    };
  }, []);

  useEffect(() => {
    let zombies: HTMLElement[] = [];
    let lastMouseMoveTime = 0;

    const getClosestSide = (x: any, y: any) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const sides = [
        { x: 0, y },
        { x: width, y },
        { x, y: 0 },
        { x, y: height },
      ];

      let closestSide = sides[0];
      let minDistance =
        Math.abs(x - closestSide.x) + Math.abs(y - closestSide.y);

      sides.forEach((side) => {
        const distance = Math.abs(x - side.x) + Math.abs(y - side.y);
        if (distance < minDistance) {
          closestSide = side;
          minDistance = distance;
        }
      });

      return closestSide;
    };

    const spawnZombie = (x: any, y: any) => {
      const zombie = document.createElement("div");
      zombie.classList.add("zombie-wrapper");

      const zombieImage = new Image();
      zombieImage.src = "/zombie-icon.png";
      zombieImage.classList.add("zombie", "animate-spin-slow");

      // Generate a random size between 0.4rem and 2rem
      const size = Math.random() * (2 - 0.4) + 0.4;
      zombieImage.style.width = `${size}rem`;
      zombieImage.style.height = `${size}rem`;

      zombie.style.position = "absolute";
      zombie.style.left = `${x}px`;
      zombie.style.top = `${y}px`;

      zombie.appendChild(zombieImage);
      document.body.appendChild(zombie);
      zombies.push(zombie);

      const opacity = Math.random() * (1 - 0.3) + 0.2;
      zombie.style.opacity = opacity.toString();

      const { x: sideX, y: sideY } = getClosestSide(x, y);
      setTimeout(() => {
        zombie.style.transition = "transform 4s linear, opacity 2s ease-out";
        zombie.style.transform = `translate(${sideX - x}px, ${sideY - y}px)`;

        setTimeout(() => {
          zombie.style.opacity = "0";
          setTimeout(() => {
            zombie.remove();
            zombies = zombies.filter((z) => z !== zombie);
          }, 2000);
        }, 8000);
      }, 1);
    };

    const handleMouseMove = (e: any) => {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime > 80) {
        lastMouseMoveTime = currentTime;
        const x = e.clientX;
        const y = e.clientY;
        spawnZombie(x, y);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      zombies.forEach((zombie) => zombie.remove());
    };
  }, []);

  return (
    <main className="flex justify-center items-center w-full h-full flex-col ">
      <div className="relative max-w-7xl w-full min-h-screen flex justify-center items-center flex-col px-12 py-8 overflow-hidden">
        <div className="relative md:mt-auto mt-24 overflow-hidden">
          <video src="/provided-video.mp4" autoPlay loop muted={isMuted} />
          <div className="absolute bg-gradient-to-b from-black w-full h-24 top-0 inset-x-0" />
          <div className="absolute bg-gradient-to-t from-black w-full h-24 bottom-0 inset-x-0" />
          <div className="absolute bg-gradient-to-l from-black h-full w-24 right-0 inset-y-0" />
          <div className="absolute bg-gradient-to-r from-black h-full w-24 left-0 inset-y-0" />
        </div>

        <div className="w-full md:mt-auto sm:mt-72 mt-24 flex flex-col gap-4">
          <div className="border-t border-[#3c3c3c] opacity-40 w-full h-2" />
          <div className="flex justify-between items-center sm:px-8 px-2 text-[#3c3c3c] z-[100]">
            <h1 className="sm:text-lg text-sm mr-auto">
              &copy; All Rights Reserved
            </h1>
            <div className="flex items-center gap-4">
              <a
                href=""
                className="bg-[#2a2a2a] sm:p-3 p-2 rounded-md hover:rounded-full duration-300 hover:opacity-80"
              >
                <FaXTwitter className="sm:w-6 sm:h-6 w-4 h-4 text-[#a5a592]" />
              </a>
              <a
                href=""
                className="bg-[#2a2a2a] sm:p-3 p-2 rounded-md hover:rounded-full duration-300 hover:opacity-80"
              >
                <LiaTelegramPlane className="sm:w-6 sm:h-6 w-4 h-4 text-[#a5a592]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bg-gradient-to-b from-black w-full h-72 top-0 inset-x-0 z-[50]" />
      <div className="absolute bg-gradient-to-t from-black w-full h-24 bottom-0 inset-x-0 z-[50]" />
      <div className="absolute bg-gradient-to-l from-black h-full w-36 right-0 inset-y-0 z-[50]" />
      <div className="absolute bg-gradient-to-r from-black h-full w-36 left-0 inset-y-0 z-[50]" />
    </main>
  );
}
