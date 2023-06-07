import { FC, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { healthFormSchema } from "../../lib/validations/formSchema";
import { z } from "zod";
import toast from "react-hot-toast";
import { submitHealthForm } from "../../lib/axios/userApi";
import { AxiosError } from "axios";
import useAuth from "../../hooks/useAuth";

interface NewFormProps {}

type FormValues = z.infer<typeof healthFormSchema>;

const NewForm: FC<NewFormProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [healthForm, setHealthForm] = useState<FormValues>({
    description: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const auth = useAuth();
  console.log(auth?.role);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHealthForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !healthForm.description ||
      !healthForm.city ||
      !healthForm.state ||
      !healthForm.country ||
      !healthForm.pincode
    ) {
      return toast.error("Please fill all the fields", { duration: 1000 });
    }

    try {
      setLoading(true);
      const validatedFormData = healthFormSchema.parse(healthForm);
      const response = await submitHealthForm(validatedFormData);
      console.log(response);
      toast.success("Form submitted successfully", { duration: 1000 });

      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message, { duration: 1000 });
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { duration: 1000 });
      } else {
        toast.error("Something went wrong", { duration: 1000 });
      }

      setLoading(false);
    }
  };

  return (
    <div className="px-4 pb-4 lg:px-0">
      <h1 className=" text-center italic text-secondary  md:text-start">
        * Fill and submit the form with the details mentioned below & we will
        contact you as soon as possible.
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col space-y-6 font-light text-secondary"
      >
        <textarea
          name="description"
          placeholder="Enter your medical problem here..."
          cols={30}
          rows={5}
          value={healthForm.description}
          onChange={handleChange}
          autoFocus
          required
          className="rounded-sm border border-secondary/10 bg-transparent p-2  italic tracking-wider outline-none focus:border-b-secondary"
        />

        <input
          type="text"
          placeholder="City"
          value={healthForm.city}
          onChange={handleChange}
          name="city"
          className="rounded-sm border border-secondary/10 bg-transparent p-2 uppercase italic  tracking-wider outline-none placeholder:normal-case focus:border-b-secondary"
        />

        <input
          type="text"
          name="state"
          value={healthForm.state}
          onChange={handleChange}
          placeholder="State"
          className="rounded-sm border border-secondary/10 bg-transparent p-2 uppercase italic  tracking-wider outline-none placeholder:normal-case focus:border-b-secondary"
        />

        <input
          type="text"
          name="country"
          value={healthForm.country}
          onChange={handleChange}
          placeholder="Country"
          className="rounded-sm border border-secondary/10 bg-transparent p-2 uppercase italic  tracking-wider outline-none placeholder:normal-case focus:border-b-secondary"
        />

        <input
          type="text"
          name="pincode"
          value={healthForm.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="rounded-sm border border-secondary/10 bg-transparent p-2 uppercase italic  tracking-wider outline-none placeholder:normal-case focus:border-b-secondary"
        />

        <button className="flex w-full items-center  justify-center rounded-sm bg-secondary/10 py-2  text-center font-custom uppercase tracking-widest text-secondary outline-none transition ease-out active:scale-95 active:ring-2 active:ring-secondary md:py-3 md:text-xl">
          {loading ? (
            <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default NewForm;
