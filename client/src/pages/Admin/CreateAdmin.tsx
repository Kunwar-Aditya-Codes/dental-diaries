import { FC, useState } from "react";
import { z } from "zod";
import { adminFormSchema } from "../../lib/validations/formSchema";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { newAdmin } from "../../lib/axios/adminApi";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type AdminForm = z.infer<typeof adminFormSchema>;

const CreateAdmin: FC = ({}) => {
  const axiosInstance = useAxiosInstance();
  const queryClient = new QueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: newAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.success("Admin created successfully");
      setAdminForm({
        adminName: "",
        adminEmail: "",
        adminPassword: "",
        adminRole: "admin",
      });
    },
  });

  const [adminForm, setAdminForm] = useState<AdminForm>({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminRole: "admin",
  });

  const handleAdminFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAdminForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({
        axiosInstance,
        ...adminForm,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-[80%] w-full items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-[50%] flex-col space-y-8 text-white"
      >
        <input
          type="text"
          autoFocus
          name="adminName"
          value={adminForm.adminName}
          onChange={handleAdminFormChange}
          required
          placeholder="Admin Name"
          className="rounded-sm border border-secondary/10 bg-transparent p-2  italic  tracking-wider outline-none placeholder:normal-case focus:border-b-secondary"
        />

        <input
          type="email"
          name="adminEmail"
          value={adminForm.adminEmail}
          onChange={handleAdminFormChange}
          required
          placeholder="Email"
          className="rounded-sm border border-secondary/10 bg-transparent p-2  italic  tracking-wider outline-none placeholder:normal-case focus:border-b-secondary"
        />

        <input
          type="password"
          name="adminPassword"
          placeholder="Password"
          value={adminForm.adminPassword}
          onChange={handleAdminFormChange}
          required
          className="rounded-sm border border-secondary/10 bg-transparent p-2  italic  tracking-wider outline-none placeholder:normal-case focus:border-b-secondary"
        />

        <select
          name="adminRole"
          value={adminForm.adminRole}
          onChange={handleAdminFormChange}
          required
          className="rounded-sm border border-secondary/10 bg-transparent p-2 italic  tracking-wider  text-white outline-none placeholder:normal-case focus:border-b-secondary"
        >
          <option value="admin">Admin</option>
          <option value="super">Super Admin</option>
        </select>

        <button className="flex w-full items-center  justify-center rounded-sm bg-secondary/10 py-2  text-center font-custom  tracking-widest text-secondary outline-none transition ease-out active:scale-95 active:ring-2 active:ring-secondary md:py-3 md:text-xl">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
