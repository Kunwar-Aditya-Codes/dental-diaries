import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full flex-col items-center justify-evenly p-4 text-slate-300">
      <form
        onSubmit={handleSubmit}
        className=" flex h-[45%] w-full max-w-[40rem] flex-col  justify-around rounded-md bg-secondary/10  px-7 py-3  font-light  shadow-xl"
      >
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105    md:text-lg"
          type="email"
          autoFocus
          placeholder="Email"
        />

        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="password"
          placeholder="Password"
        />

        <button className="rounded-sm bg-secondary/10 py-2  font-custom uppercase tracking-widest text-secondary  outline-none transition ease-out active:scale-95 active:ring-2 active:ring-secondary md:py-3 md:text-xl">
          Login
        </button>
      </form>

      <div className="mx-auto mt-4 flex w-full max-w-[35rem] flex-col items-center space-y-2">
        <p className="text-start">
          Don't have an account?{" "}
          <Link
            to="/user_register"
            className="font-custom tracking-widest text-secondary"
          >
            Register
          </Link>
        </p>

        <Link to="/" className="underline underline-offset-4">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Login;
