import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface UserData extends IUser {
  password: string;
}

const Register: FC = ({}) => {
  const [userData, setUserData] = useState<UserData>({
    age: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: 0,
  });

  return (
    <div className="flex h-full flex-col items-center justify-evenly p-4 text-slate-300">
      <form className=" flex h-[75%] w-full max-w-[35rem] flex-col  justify-around rounded-lg bg-secondary/10  p-4  font-light  shadow-xl backdrop-blur-md">
        <div className="flex flex-col space-y-2  md:flex-row md:items-center md:justify-between md:space-x-6 md:space-y-0">
          <input
            className="rounded-lg border-b bg-transparent px-2 py-3  tracking-wide shadow-lg  outline-none focus:ring-1 focus:ring-white  md:flex-grow md:text-lg"
            type="text"
            autoFocus
            placeholder="First Name"
          />
          <input
            className="rounded-lg border-b bg-transparent px-2 py-3  tracking-wide   shadow-lg outline-none focus:ring-1 focus:ring-white  md:flex-grow md:text-lg"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className="rounded-lg border-b bg-transparent px-2 py-3  tracking-wide  shadow-lg outline-none   focus:ring-1  focus:ring-white md:text-lg"
          type="email"
          placeholder="Email"
        />
        <input
          className="rounded-lg border-b bg-transparent px-2 py-3  tracking-wide  shadow-lg outline-none   focus:ring-1  focus:ring-white md:text-lg"
          type="text"
          placeholder="Age"
        />
        <input
          className="rounded-lg border-b bg-transparent px-2 py-3  tracking-wide  shadow-lg outline-none   focus:ring-1  focus:ring-white md:text-lg"
          type="text"
          placeholder="Phone Number"
        />
        <input
          className="rounded-lg border-b bg-transparent px-2 py-3  tracking-wide  shadow-lg outline-none   focus:ring-1  focus:ring-white md:text-lg"
          type="password"
          placeholder="Password"
        />

        <button className="rounded-lg bg-secondary py-2 font-custom text-lg text-primary outline-none md:py-4">
          Register
        </button>
      </form>

      <div className="mx-auto mt-4 flex w-full max-w-[35rem] flex-col items-center space-y-2">
        <p className="text-start">
          Already have an account?{" "}
          <Link to="/login" className="font-custom text-secondary">
            Login
          </Link>
        </p>

        <Link to="/" className="underline underline-offset-2">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;
