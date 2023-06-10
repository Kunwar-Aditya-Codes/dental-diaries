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
    <table className="table">
      <thead>
        <tr className="border-b-secondary/10 text-center text-lg">
          <th>Form ID</th>
          <th>Username</th>
          <th>Age</th>
          <th>Description</th>
          <th>Form Status</th>
          <th>Form Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {forms.length === 0 ? (
          <tr>
            <td colSpan={7}>No Forms</td>
          </tr>
        ) : (
          forms.map((form) => (
            <tr
              key={form.formId}
              className="border-none text-center font-medium"
            >
              <td>{form.formId}</td>
              <td>
                {form.User.firstName} {form.User.lastName}
              </td>
              <td>{form.User.age}</td>
              <td className="w-5 text-center">{form.description}</td>
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
