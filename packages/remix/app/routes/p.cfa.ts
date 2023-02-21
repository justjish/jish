import { type LoaderFunction } from "@remix-run/server-runtime";

export const loader:LoaderFunction = ({ request }) => fetch(new URL(`https://jish.dev/cdn-cgi/rum${new URL(request.url).search}`),request);