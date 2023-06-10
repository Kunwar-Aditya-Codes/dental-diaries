import { FC } from "react";
import Hero from "/hero.png";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="min-h-screen min-w-full">
      <div className="mx-auto flex h-[90%] max-w-[85rem] flex-col px-10 py-4 md:flex-row md:items-center">
        <div className="flex flex-[0.5] flex-col items-center space-y-8 md:items-start md:justify-start md:space-y-28 md:text-center">
          <div>
            <h1 className=" text-center font-custom text-6xl tracking-wide text-secondary md:text-start md:text-8xl lg:text-[9rem]">
              Dental Diaries
            </h1>
            <p className="mt-3 text-center italic text-secondary md:text-start md:text-xl">
              Smile is the prettiest thing you can wear.
            </p>
          </div>
          <button className="">
            <Link
              to="/user_register"
              className="rounded-sm bg-secondary px-4 py-2 text-xl
            font-medium tracking-wider text-primary drop-shadow-[3px_5px_30px_rgba(182,236,255,1)] transition ease-out hover:drop-shadow-[3px_5px_40px_rgba(182,236,255,1)]  lg:px-8 lg:py-4 lg:text-2xl"
            >
              Register
            </Link>
          </button>
        </div>
        <div className="flex h-full flex-[0.5] items-end justify-center md:items-center md:justify-center">
          <img
            src={Hero}
            alt="hero-image"
            className="w-[85%] sm:w-[60%] md:w-[100%] "
          />
        </div>
      </div>

      {/* Tweets Card Section */}
      <div className="w-full bg-white text-primary">
        <div className="mx-auto max-w-[85rem] p-4">
          <div></div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full  text-white">
        <div className="mx-auto max-w-[85rem] p-4">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
