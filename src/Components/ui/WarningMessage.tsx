"use client"
// Hooks
import { useEffect, useRef } from "react";
import { useWarningMessageStore } from "../../../store/warningMessageStore";

// Components
import { Button } from "./Button";

export const WarningMessage = () => {;
  const { visible, message, details, hide } = useWarningMessageStore()
  const circleRef = useRef<SVGCircleElement>(null)


  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        hide()
      }, 4000)

      // Reset animation
      if (circleRef.current) {
        circleRef.current.style.animation = 'none'
        // Force reflow (reset)
        void (circleRef.current as unknown as HTMLElement).offsetWidth;
        circleRef.current.style.animation = 'countdownCircle 4s linear forwards'
      }

      return () => clearTimeout(timer)
    }
  }, [visible, hide]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-30">
      <div className="bg-white w-[330px] h-[195px] rounded-xl shadow-lg flex flex-col p-8">
        <h2 className="text-lg text-left font-bold text-primary-text mb-2">{message}</h2>
        <p className="text-sm text-left text-primary-text leading-4.5">{details}</p>

        <div
         className="w-full flex flex-row items-center mt-7 justify-between"
        >
          <Button
            onClick={hide}
            customStyle="rounded hover:bg-lighter transition max-w-[69px] justify-start rounded-xl mt-0 font-semibold text-xs pl-4 "
          >
            Ok
          </Button>

          <div className=" flex justify-center items-center relative w-[32px] h-[32px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 36 36"
            >
              <circle
                ref={circleRef}
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#272727"
                strokeWidth="4"
                strokeDasharray="100"
                strokeDashoffset="100"
              />
            </svg>
          </div>       
        </div>
      </div>
    </div>
  )
} 