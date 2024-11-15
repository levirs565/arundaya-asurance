import useSWR from "swr";
import { fetcher, httpDelete, post, put } from "./common";
import useSWRMutation from "swr/mutation";

const listKey = "/user/claim";

export const useClaimMake = () => useSWRMutation(
    listKey,
    (key, { arg }) => post("/user/claim", arg)
);
export const useClaimList = () => useSWR(listKey, fetcher);
export const useClaimById = (id: number) => useSWR(`/user/claim/${id}`, fetcher);
export const useClaimDelete = (id: number) => useSWRMutation(
    listKey,
    () => httpDelete(`/user/claim/${id}`)
)
export const useClaimEdit = (id: number) => useSWRMutation(
    listKey,
    (key, { arg }) => put(`/user/claim/${id}`, arg),
)