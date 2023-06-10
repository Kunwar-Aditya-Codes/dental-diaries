import { FC } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { viewForms } from "../../lib/axios/adminApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EditFormTable from "../../components/EditFormTable";

interface EditFormProps {}

const EditForm: FC<EditFormProps> = ({}) => {
  const axiosInstance = useAxiosInstance();
  const forms = viewForms(axiosInstance);

  return (
    <div>
      <EditFormTable />
    </div>
  );
};

export default EditForm;
