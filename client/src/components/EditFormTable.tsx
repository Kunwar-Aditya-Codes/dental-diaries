import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { updateForm } from "../lib/axios/adminApi";
import useAxiosInstance from "../hooks/useAxiosInstance";

interface EditFormTableProps {
  forms: IHEALTHFORM[];
}

const EditFormTable: FC<EditFormTableProps> = ({ forms }) => {
  const formStatusColors: { [status: string]: string } = {
    pending: "text-yellow-400",
    approved: "text-green-400",
    rejected: "text-red-400",
    completed: "text-sky-400",
  };

  const [formStatuses, setFormStatuses] = useState<{
    [formId: string]: string;
  }>({});

  const handleFormStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    formId: string
  ) => {
    setFormStatuses((prevStatuses) => ({
      ...prevStatuses,
      [formId]: e.target.value,
    }));
  };

  const axiosInstance = useAxiosInstance();

  const mutation = useMutation({
    mutationFn: updateForm,
  });

  const handleFormStatusUpdate = async (formId: string, formStatus: string) => {
    await mutation.mutateAsync({
      axiosInstance,
      formId,
      formStatus,
    });
  };

  return (
    <table className="w-[95%] table-auto  border-collapse ">
      <thead>
        <tr className="border-b border-b-secondary/10 text-center text-lg text-secondary">
          <th className="pb-4">Form ID</th>
          <th className="pb-4">Username</th>
          <th className="pb-4">Age</th>
          <th className="pb-4">Description</th>
          <th className="pb-4">Form Status</th>
          <th className="pb-4">Form Created At</th>
          <th className="pb-4">Action</th>
        </tr>
      </thead>
      <tbody className="">
        {forms.length === 0 ? (
          <tr className="text-white">
            <td colSpan={7}>No Forms</td>
          </tr>
        ) : (
          forms.map((form) => (
            <tr
              key={form.formId}
              className="h-[5rem] border-none  text-center text-white"
            >
              <td className="">{form.formId.slice(0, 12)}...</td>
              <td>
                {form.User.firstName} {form.User.lastName}
              </td>
              <td>{form.User.age}</td>
              <td className="w-[20rem] text-center">{form.description}</td>
              <td>
                <select
                  className={`${
                    formStatusColors[form.formStatus] || "text-gray-400"
                  }
                   rounded-sm border border-secondary/10 bg-transparent px-4 py-2  outline-none`}
                  value={formStatuses[form.formId] || form.formStatus}
                  onChange={(e) => handleFormStatusChange(e, form.formId)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td>{new Date(form.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className=" rounded-sm bg-secondary/10 px-4 py-2 font-medium text-secondary transition ease-out active:scale-95"
                  onClick={() =>
                    handleFormStatusUpdate(
                      form.formId,
                      formStatuses[form.formId] || form.formStatus
                    )
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EditFormTable;
