import { FC } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { viewForms } from "../../lib/axios/adminApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EditFormTable from "../../components/EditFormTable";

interface EditFormProps {}

const EditForm: FC<EditFormProps> = ({}) => {
  const axiosInstance = useAxiosInstance();
  const { data, isLoading } = viewForms(axiosInstance);

  const forms = data?.data?.forms;

  return (
    <div className="">
      {isLoading ? (
        <AiOutlineLoading3Quarters className="mx-auto mt-4 animate-spin  text-2xl text-secondary" />
      ) : (
        <div className="h-[32rem] overflow-hidden overflow-y-scroll ">
          <EditFormTable forms={forms} />
        </div>
      )}
    </div>
  );
};

export default EditForm;
