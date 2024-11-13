import useSWRMutation from "swr/mutation";
import { post } from "./common";

const employeeListKey = "/employee";

export const useAccountAddEmployee = () => useSWRMutation(
    employeeListKey, 
    (key, { arg }) => post("/account/add-employee", arg)
);