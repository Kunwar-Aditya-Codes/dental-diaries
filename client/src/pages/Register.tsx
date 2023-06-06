import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { registerUserSchema } from "../lib/validations/registerSchema";
import { z } from "zod";
import { registerUser } from "../lib/axios/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type UserData = z.infer<typeof registerUserSchema>;


const Register: FC = ({}) => {
  const [userData, setUserData] = useState<UserData>({
    age: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
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

    if (
      !userData.age ||
      !userData.email ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.password ||
      !userData.phoneNumber
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const validatedUserData = registerUserSchema.parse(userData);
      setLoading(true);
      const response = await registerUser(validatedUserData);
      console.log(response);
      setLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message);
      } else {
        alert("Something went wrong");
      }
    }
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
            name="firstName"
            onChange={handleChange}
            value={userData.firstName}
            autoFocus
            required
            placeholder="First Name"
          />
          <input
            className=" border-b bg-transparent px-2 py-3  tracking-wide  text-secondary   outline-none transition ease-out focus:scale-105    md:flex-grow md:text-lg"
            type="text"
            name="lastName"
            onChange={handleChange}
            value={userData.lastName}
            required
            placeholder="Last Name"
          />
        </div>
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out  focus:scale-105    md:text-lg"
          type="email"
          name="email"
          onChange={handleChange}
          value={userData.email}
          required
          placeholder="Email"
        />
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="text"
          name="age"
          onChange={handleChange}
          value={userData.age}
          required
          placeholder="Age"
        />
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="text"
          name="phoneNumber"
          onChange={handleChange}
          value={userData.phoneNumber}
          required
          placeholder="Phone Number"
        />
        <input
          className=" border-b bg-transparent px-2 py-3  tracking-wide text-secondary outline-none  transition ease-out   focus:scale-105      md:text-lg"
          type="password"
          name="password"
          onChange={handleChange}
          required
          placeholder="Password"
        />

        <button className=" flex w-full items-center  justify-center rounded-sm bg-secondary/10 py-2  text-center font-custom uppercase tracking-widest text-secondary outline-none transition ease-out active:scale-95 active:ring-2 active:ring-secondary md:py-3 md:text-xl">
          {loading ? (
            <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
          ) : (
            "Register"
          )}
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
