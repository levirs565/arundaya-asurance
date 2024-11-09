const ROOT = "http://localhost:3000/api";

async function fetchWrapper(fetchArgs: Parameters<typeof fetch>) {
    const res = await fetch(`${ROOT}${fetchArgs[0]}`, {
        credentials: "include",
        ...fetchArgs[1]});
    const json = await res.json();
    if (json["error"]) {
        throw json["error"];
    }

    return json;
}

export const fetcher = (path: string) => fetchWrapper([path])

export const post = (path: string, data: any) => fetchWrapper([path, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}])
