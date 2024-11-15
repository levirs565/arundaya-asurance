import useSWRMutation from "swr/mutation";
import { fetcher, post, put } from "./common";
import useSWR from "swr";

const employeeListKey = "/admin/employee";

export const useAccountAddEmployee = () => useSWRMutation(
    employeeListKey,
    (key, { arg }) => post("/admin/employee", arg)
);

export const useAccountDataEmployee = (id: string) => useSWR(`/admin/employee/${id}`, fetcher);

export const useAccountEditEmployee = (id: string) => useSWRMutation(
    employeeListKey,
    (key, { arg }) => put(`/admin/employee/${id}`, arg)
)

export const useAccountListEmployee = () => useSWR(employeeListKey, fetcher);