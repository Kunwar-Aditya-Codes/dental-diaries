import { FC } from "react";
import Hero from "/hero.png";
import { Link } from "react-router-dom";

//! Add font family montserrat

const Home: FC = ({}) => {
  return (
    <div className="flex flex-grow flex-col px-10 py-4 md:flex-row md:items-center">
      <div className="flex h-full flex-[0.5] flex-col items-center space-y-8 md:items-start md:justify-center md:space-y-20 md:text-center">
        <h1 className=" text-center text-6xl tracking-wider text-seconday  md:text-start md:text-8xl lg:text-[9rem]">
          Dental Diaries
        </h1>
        <p className="text-center italic text-seconday md:text-start md:text-xl">
          Smile is the prettiest thing you can wear.
        </p>
        <button>
          <Link
            to="/register"
            className="rounded-sm bg-seconday px-4  py-2  text-xl
              font-medium tracking-wider text-primary drop-shadow-[3px_5px_50px_rgba(182,236,255,1)] lg:px-8 lg:py-4 lg:text-2xl"
          >
            Register
          </Link>
        </button>
      </div>
      <div className="flex h-full flex-[0.5] items-end justify-center md:items-center md:justify-end">
        <img
          src={Hero}
          alt="hero-image"
          className="w-[85%] sm:w-[60%] md:w-[100%] "
        />
      </div>
    </div>
  );
};

export default Home;
