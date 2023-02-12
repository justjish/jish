import { LoaderFunction } from '@remix-run/server-runtime';

export const loader: LoaderFunction = async ({ request, context }) => {
  const doesCFExistInRequest = 'cf' in request ? 'CF EXISTS IN REQUEST' : 'CF DOES NOT EXIST IN REQUEST';
  const doesCFExistInContext = 'cf' in context ? 'CF EXISTS IN CONTEXT' : 'CF DOES NOT EXIST IN CONTEXT';
  const propertiesOfRequest = Object.getOwnPropertyNames(request);
  const propertiesOfContext = Object.getOwnPropertyNames(context);
  return new Response(
    JSON.stringify({
      doesCFExistInRequest,
      cfContentsInRequest: request?.cf,
      doesCFExistInContext,
      propertiesOfRequest,
      propertiesOfContext,
    }),
  );
};
