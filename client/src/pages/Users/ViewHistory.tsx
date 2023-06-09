import { FC } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { viewHistory } from "../../lib/axios/userApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ViewHistoryProps {}

const ViewHistory: FC<ViewHistoryProps> = ({}) => {
  const formStatus = {
    pending: "text-yellow-500",
    approved: "text-green-500",
    rejected: "text-red-500",
    completed: "text-sky-500",
  };

  const axiosInstance = useAxiosInstance();

  const { data, isLoading } = useQuery(
    ["viewHistory"],
    () => viewHistory(axiosInstance),
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: false,
    }
  );

  const forms = data?.data?.forms;

  return (
    <div className="h-[35rem] overflow-hidden ">
      <h1 className="text-center font-custom text-xl uppercase italic text-secondary">
        Your Forms
      </h1>

      <div className="mt-4 h-full overflow-y-scroll pb-8">
        {isLoading ? (
          <AiOutlineLoading3Quarters className="mx-auto mt-4 animate-spin  text-2xl text-secondary" />
        ) : (
          <>
            {forms?.map((form: IHEALTHFORM) => (
              <div
                key={form.formId}
                className="mx-4 mb-4 flex flex-col space-y-2 rounded-sm bg-secondary/10 p-4 text-base text-gray-200 lg:mx-0"
              >
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  <span className="mr-1 font-custom text-lg  tracking-wider text-secondary">
                    Problem:
                  </span>
                  {form.description}
                </p>
                <p>
                  <span className="mr-1 font-custom text-lg  tracking-wider text-secondary">
                    Age:
                  </span>
                  {form.User.age}
                </p>
                <p>
                  <span className="mr-1 font-custom text-lg  tracking-wider text-secondary">
                    Submitted on:
                  </span>

                  {new Date(form.createdAt).toLocaleDateString()}
                </p>

                <p
                  className={`
                ${formStatus[form.formStatus as keyof typeof formStatus]}
                `}
                >
                  <span className="mr-1 font-custom text-lg  tracking-wider text-secondary">
                    Status:
                  </span>
                  <span className="font-medium tracking-wider">
                    {form.formStatus.toUpperCase()}
                  </span>
                </p>

                <p>
                  <span className="mr-1 font-custom text-lg  tracking-wider text-secondary">
                    Location:
                  </span>
                  {form.city}, {form.state}, {form.country} - {form.zipCode}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewHistory;
