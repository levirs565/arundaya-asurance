import useSWRMutation from "swr/mutation";
import { fetcher, post } from "./common";
import useSWR from "swr";

const employeeListKey = "/account/employee";

export const useAccountAddEmployee = () => useSWRMutation(
    employeeListKey, 
    (key, { arg }) => post("/account/employee", arg)
);

export const useAccountListEmployee = () => useSWR(employeeListKey, fetcher);