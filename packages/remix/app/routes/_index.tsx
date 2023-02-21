import type { MetaFunction, LinksFunction, LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import App from '~/components/App';

export const meta: MetaFunction = () => {
  return {
    title: 'jish.dev',
    description: 'All-in-one remix starter template for Cloudflare Workers',
  };
};

export const links: LinksFunction = () => {
  return [];
};

export const loader = async ({ request, context }: LoaderArgs) => {
  const { ...args } = context;
  return json({
    title: 'remix-worker-template',
  });
};

export default function Index() {
  const { title } = useLoaderData<typeof loader>();
  return <App />;
}
