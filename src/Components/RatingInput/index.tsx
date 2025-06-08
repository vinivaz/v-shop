// components/StarInput.tsx
"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

type Props = {
  onChange: (value: number) => void;
};

export default function RatingInput({ onChange }: Props) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [rating, setRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onChange(value);
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const percent = x / width;
    const value = percent <= 0.5 ? index + 0.5 : index + 1;
    setHoverValue(value);
  };

  return (
    <div className="flex gap-1 text-yellow-400 cursor-pointer">
      {[...Array(5)].map((_, i) => {
        const currentValue = hoverValue !== null ? hoverValue : rating;

        let icon;
        if (currentValue >= i + 1) {
          icon = solidStar;
        } else if (currentValue >= i + 0.5) {
          icon = faStarHalfAlt;
        } else {
          icon = regularStar;
        }

        return (
          <div
            key={i}
            onClick={() => handleClick(currentValue >= i + 0.75 ? i + 1 : i + 0.5)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoverValue(null)}
          >
            <FontAwesomeIcon icon={icon} />
          </div>
        );
      })}
    </div>
  );
}
