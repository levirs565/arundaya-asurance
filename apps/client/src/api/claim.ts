import useSWR from "swr";
import { fetcher, httpDelete, post, put } from "./common";
import useSWRMutation from "swr/dist/mutation";

const listKey = "/claim";

export const useClaimMake = () => useSWRMutation(
    listKey,
    (key, { arg }) => post("/claim", arg)
);
export const useClaimList = () => useSWR(listKey, fetcher);
export const useClaimById = (id: number) => useSWR(`/claim/${id}`, fetcher);
export const useClaimDelete = (id: number) => useSWRMutation(
    `/claim/${id}`,
    () => httpDelete(`/claim/${id}`)
)
export const useClaimEdit = (id: number) => useSWRMutation(
    `/claim/${id}`,
    (key, { arg }) => put(`/claim/${id}`, arg)
)