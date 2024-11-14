import useSWR from "swr";
import { fetcher, post, put } from "./common";
import useSWRMutation from "swr/mutation";

const availableKey = "/employee/claim/available";
const assignedKey = "/employee/claim/assigned";

export const useEmployeeClaimAvailable = () => useSWR(availableKey, fetcher);
export const useEmployeeClaimTake = (id: number) => useSWRMutation(
    availableKey,
    (key, { arg }) => post(`/employee/claim/${id}/take`, undefined)
)
export const useEmployeeClaimAssigned = () => useSWR(assignedKey, fetcher);
export const useEmployeeClaimById = (id: number) => useSWR(`/employee/claim/${id}`, fetcher)
export const useEmployeeClaimEditMessage = (id: number) => useSWRMutation(
    `/employee/claim/${id}`,
    (key, { arg }) => put(`/employee/claim/${id}/message`, arg)
)

export const useEmployeeClaimAccept = (id: number) => useSWRMutation(
     `/employee/claim/${id}`,
     (key, { arg }) => post(`/employee/claim/${id}/accept`, undefined)
)

export const useEmployeeClaimReject = (id: number) => useSWRMutation(
    `/employee/claim/${id}`,
    (key, { arg }) => post(`/employee/claim/${id}/reject`, undefined)
)