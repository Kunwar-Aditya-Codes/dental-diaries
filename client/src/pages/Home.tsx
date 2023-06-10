import { FC } from "react";
import Hero from "/hero.png";
import { Link } from "react-router-dom";
import { AiOutlineTwitter } from "react-icons/ai";

const tweets = [
  {
    id: 1,
    tweet:
      "Just had the most amazing experience at #DentalDiaries! The staff was incredibly friendly, and my teeth have never looked better! Thank you so much!",
    name: "@SmilingSarah",
  },

  {
    id: 2,
    tweet:
      "Shoutout to #DentalDiaries for making my dental visit stress-free and comfortable. The dentists are highly skilled, and the atmosphere is so relaxing. I'm thrilled with my new smile!",
    name: "@SparklingSam",
  },

  {
    id: 3,
    tweet:
      "I can't thank #DentalDiaries enough for the exceptional care I received today. From start to finish, the team was attentive and professional. My teeth are shining bright, and I couldn't be happier!",
    name: "@JoyfulJulia",
  },
  {
    id: 4,
    tweet:
      "Just had a fantastic check-up at #DentalDiaries. The hygienist was thorough, and the dentist provided great advice. I feel confident in their expertise, and my teeth are grateful!",
    name: "@RadiantRobert",
  },
  {
    id: 5,
    tweet:
      "Kudos to #DentalDiaries for the outstanding service. The staff was super friendly, and the clinic is equipped with top-notch technology. My dental issues were resolved with ease. Highly recommend! ",
    name: "@EnergeticEmily",
  },
  {
    id: 6,
    tweet:
      "A big thanks to #DentalDiaries for their gentle and caring approach. The dentist was compassionate and knowledgeable, ensuring my comfort throughout the procedure. Delighted with the results!",
    name: "@DazzlingDave",
  },
  {
    id: 7,
    tweet:
      "Just got my braces off at #DentalDiaries, and my smile is simply stunning! The orthodontist was fantastic, and the entire team made the process smooth. Grateful for their expertise!",
    name: "@GlowingGrace",
  },
];

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
                <p className="text-right font-custom text-sm ">{tweet.name}</p>
              </div>
            </div>
          ))}
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
