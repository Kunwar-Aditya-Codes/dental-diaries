import { ColumnDef } from "@tanstack/react-table";

export const tableHeader: ColumnDef<IHEALTHFORM>[] = [
  {
    accessorKey: "formId",
    header: "Form Id",
  },
  {
    accessorKey: "formDescription",
    header: "Form Description",
  },

  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "userAge",
    header: "User Age",
  },
  {
    accessorKey: "formStatus",
    header: "Form Status",
  },
];
