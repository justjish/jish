/// <reference types="@cloudflare/workers-types" />

/**
 * The Environments variables defined in Cloudflare BEFORE runtime.
 *
 * In Remix, the context you are actually accessing has been merged
 * with the Cloudflare runtime via the 'EventContext' typing. This is
 * why you can access 'context.ASSETS' in your Remix code, but it is
 * not defined here.
 */
declare type Env = {
  IMAGE_KV: KVNamespace;
  SELF_URL: string;
};

declare type ASSETS = EventContext<Env, any, any>['env']['ASSETS'];
