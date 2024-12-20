import useSWR from "swr";
import { fetcher, httpDelete, post } from "./common";
import useSWRMutation from "swr/mutation";

export const usePremiHasPaid = () => useSWR("/premi/has-paid", fetcher);

const premiListKey = "/premi";
export const usePremiPay = () => useSWRMutation(
    premiListKey,
    (key, { arg }) => post("/premi/pay", arg)

);
export const usePremiUpgrade = () => useSWRMutation(
    premiListKey,
    (key, { arg }) => post("/premi/upgrade", arg)
)

export const usePremiList = () => useSWR(premiListKey, fetcher);
export const usePremiById = (id: number) => useSWR(`/premi/${id}`, fetcher);
export const usePremiCancel = (id: number) => useSWRMutation(
    premiListKey,
    (key, { arg }) => httpDelete(`/premi/${id}`)
)