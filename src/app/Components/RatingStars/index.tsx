// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";


type StarRatingProps = {
  rating: number;
};


export function RatingStars({ rating }: StarRatingProps){
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  console.log()

  return(
    <div className="flex items-center gap-1 text-yellow-400 pr-1">
      {[...Array(totalStars)].map((_, i) => {
        if (i < fullStars) {
          return <FontAwesomeIcon key={i} icon={solidStar}/>;
        } else if (i === fullStars && hasHalfStar) {
          return <FontAwesomeIcon key={i} icon={faStarHalfAlt} />;
        } else {
          return <FontAwesomeIcon key={i} icon={regularStar} />;
        }
      })}
    </div>
  )
}