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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full flex-col items-center justify-evenly p-4 text-slate-300">
      <form
        onSubmit={handleSubmit}
        className=" flex h-[75%] w-full max-w-[40rem] flex-col  justify-around rounded-md bg-secondary/10  px-7 py-3  font-light  shadow-xl"
      >
        <div className="flex flex-col  space-y-2  md:flex-row md:items-center md:justify-between md:space-x-6 md:space-y-0">
          <input
            className="  border-b bg-transparent px-2 py-3 tracking-wide text-secondary   outline-none transition ease-out focus:scale-105   md:flex-grow md:text-lg"
            type="text"
            autoFocus
            placeholder="First Name"
          />
          <input
            className=" border-b bg-transparent px-2 py-3  tracking-wide  text-secondary   outline-none transition ease-out focus:scale-105    md:flex-grow md:text-lg"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105    md:text-lg"
          type="email"
          placeholder="Email"
        />
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="text"
          placeholder="Age"
        />
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="text"
          placeholder="Phone Number"
        />
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="password"
          placeholder="Password"
        />

        <button className="active: rounded-sm bg-secondary/10  py-2 font-custom uppercase tracking-widest  text-secondary outline-none transition ease-out active:scale-95 active:ring-2 active:ring-secondary md:py-3 md:text-xl">
          Register
        </button>
      </form>

      <div className="mx-auto mt-4 flex w-full max-w-[35rem] flex-col items-center space-y-2">
        <p className="text-start">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-custom tracking-widest text-secondary"
          >
            Login
          </Link>
        </p>

        <Link to="/" className="underline underline-offset-4">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;
