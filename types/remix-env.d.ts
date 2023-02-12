/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types"/>

declare var process: {
  env: { NODE_ENV: 'development' | 'production' };
};

declare module '@remix-run/server-runtime' {
  export * from '@remix-run/server-runtime/dist/index';
  import type { DataFunctionArgs as RemixDataFunctionArgs } from '@remix-run/server-runtime/dist/index';
  export interface DataFunctionArgs extends Omit<RemixDataFunctionArgs, 'context' | 'request'> {
    request: RemixDataFunctionArgs['request'] & {
      cf?: IncomingRequestCfPropertiesGeographicInformation &
        IncomingRequestCfPropertiesBase &
        IncomingRequestCfPropertiesBotManagement;
    };
    context: EventContext<Env, any, any>['env'];
  }
  export interface ActionFunction {
    (args: DataFunctionArgs): null | Response | Promise<Response>;
  }
  export interface LoaderFunction {
    (args: DataFunctionArgs): null | Response | Promise<Response>;
  }
}
