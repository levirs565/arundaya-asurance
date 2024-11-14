import useSWRMutation from "swr/mutation";
import { fetcher, post } from "./common";
import useSWR from "swr";

const employeeListKey = "/admin/employee";

export const useAccountAddEmployee = () => useSWRMutation(
    employeeListKey, 
    (key, { arg }) => post("/admin/employee", arg)
);

export const useAccountListEmployee = () => useSWR(employeeListKey, fetcher);