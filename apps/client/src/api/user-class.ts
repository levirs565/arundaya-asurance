import useSWR from "swr";
import { fetcher } from "./common";

export const useUserClassList = useSWR("/user-class", fetcher);