import { FC } from "react";
import Hero from "/hero.png";
import { Link } from "react-router-dom";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTwitterSquare } from "react-icons/fa";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { tweets } from "../lib/tweets";

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
            font-medium tracking-wider text-primary drop-shadow-[3px_5px_30px_rgba(182,236,255,0.6)] transition ease-out hover:drop-shadow-[3px_5px_40px_rgba(182,236,255,1)]  lg:px-8 lg:py-4 lg:text-2xl"
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
      <div className="mt-[8rem] w-full  text-secondary">
        <h1 className="mx-2 mb-16 text-center font-custom text-2xl italic drop-shadow-[3px_5px_50px_rgba(182,236,255,1)] sm:text-4xl md:text-6xl">
          Our customers love us...
        </h1>

        <div className="mx-auto grid max-w-[85rem] grid-cols-1 justify-items-center gap-[5rem] px-4 py-8 lg:grid-cols-2 ">
          <Fade bottom cascade>
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="mx-2 flex max-h-[25rem] max-w-[35rem] cursor-default items-start  justify-between space-x-4 rounded-md bg-secondary/10 px-4 py-6 shadow-lg backdrop-blur-md"
              >
                <AiOutlineTwitter className="h-8 w-8 flex-[0.2]  text-sky-500" />
                <div className="flex h-full flex-[0.8] flex-col justify-between px-4 lg:space-y-4 ">
                  <p className="text-justify text-base md:text-lg">
                    {tweet.tweet}
                  </p>
                  <p className="text-right font-custom text-sm ">
                    {tweet.name}
                  </p>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 w-full bg-secondary/10 text-white">
        <div className="mx-auto flex max-w-[85rem] flex-col items-center space-y-6 px-4 py-8 text-center  lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
          <div>
            <div>
              <h1 className="font-custom text-lg tracking-wider">Address</h1>
              <p className="space-y-4  font-light">
                1234 Main Street
                <br />
                Anytown, USA 12345
              </p>
            </div>
            <div className="mt-6">
              <h1 className="font-custom text-lg tracking-wider">Contact</h1>
              <p className="space-y-4 font-light">
                Phone: 123-456-7890
                <br />
                Email: support@dentaldiaries.com
              </p>
            </div>
          </div>
          <div>
            <h1 className="font-custom text-lg tracking-wider ">Socials</h1>
            <div className="mt-2 flex space-x-4">
              <FaFacebook className="h-6 w-6 cursor-pointer text-white hover:text-blue-500" />
              <FaInstagram className="h-6 w-6 cursor-pointer text-white hover:text-pink-500" />
              <FaTwitterSquare className="h-6 w-6 cursor-pointer text-white hover:text-sky-500" />
            </div>
          </div>
          <div>
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span>
                <a
                  href="https://kunwar-aditya-portfolio.vercel.app/"
                  rel="noreferrer"
                  target="_blank"
                  className="font-medium tracking-wider text-secondary"
                >
                  Kunwar Aditya
                </a>
              </span>
              .
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
