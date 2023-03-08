import type { MetaFunction, LinksFunction } from '@remix-run/cloudflare';
import App from '~/components/App';

export const meta: MetaFunction = () => {
  return {
    title: 'Jish.Dev',
    description: 'Get to know Sujish Patel, A Full Stack Developer.',
  };
};

export const links: LinksFunction = () => {
  return [];
};

export default function Index() {
  return <App />;
}
