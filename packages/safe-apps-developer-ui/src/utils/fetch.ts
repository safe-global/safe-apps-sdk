// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchJSON = (url: RequestInfo, opts?: RequestInit): Promise<any> => fetch(url, opts).then((resp) => resp.json());

export { fetchJSON };
