import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { loginUser } from "../lib/axios/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { loginUserSchema } from "../lib/validations/formSchema";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      toast.error("Please fill all the fields", { duration: 1000 });
      return;
    }

    try {
      const validatedUserData = loginUserSchema.parse(userData);
      setLoading(true);
      const response = await loginUser(validatedUserData);
      console.log(response);
      setLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else toast.error("Something went wrong");
      setLoading(false);
    }
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
          required
          name="email"
          onChange={handleChange}
          value={userData.email}
          autoFocus
          placeholder="Email"
        />

        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={userData.password}
          placeholder="Password"
        />

        <button className="flex items-center justify-center rounded-sm bg-secondary/10 py-2  font-custom uppercase tracking-widest text-secondary  outline-none transition ease-out active:scale-95 active:ring-2 active:ring-secondary md:py-3 md:text-xl">
          {loading ? (
            <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
          ) : (
            "Login"
          )}
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
