import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { fetcher, post } from "./common";

const accountStatePath = "/account/state";

export const useAccountState = () => useSWR(accountStatePath, fetcher);
export const useAccountLogin = () => useSWRMutation(
    accountStatePath, 
    (key, { arg }) => post("/account/login", arg)
);

export const useAccountRegister = () => useSWRMutation(
    accountStatePath,
    (key, { arg }) => post("/account/register", arg)
)
export const useAccountLogout = () => useSWRMutation(
    accountStatePath,
    () => post("/account/logout", undefined)
)