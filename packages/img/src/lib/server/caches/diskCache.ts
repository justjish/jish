import { CacheConfig, Cache, CacheStatus } from '../../types/cache';
import type BaseCache from '@next-boost/hybrid-disk-cache';
import type { Adapter } from '@next-boost/hybrid-disk-cache';

export interface DiskCacheConfig extends CacheConfig {
  /**
   * Path: the relative path where the cache should be stored
   */
  path: string;
}

export class DiskCache extends Cache {
  config: DiskCacheConfig;
  adapter: Promise<Adapter>;
  cache: Promise<BaseCache>;

  constructor(config: Partial<DiskCacheConfig> | null | undefined = {}) {
    super();

    this.config = {
      path: config?.path ?? 'tmp/img',
      ttl: config?.ttl ?? 24 * 60 * 60,
      tbd: config?.tbd ?? 365 * 24 * 60 * 60,
    };
    /**
     * @next-boost/hybrid-disk-cache is typed fairly poorly.
     *
     * If you import '@next-boost/hybrid-disk-cache' and access
     * the 'default' property. There is no 'default' Class Cache.
     * The following if what is returned:
     * default [Module: null prototype] {
     *    Adapter: [Function: Adapter2],
     *    __esModule: true,
     *    default: { Adapter: [Getter], default: [Function: Cache2]
     * }
     * In order to use module, you can either
     * 1. use the 'Adapter' property to create an instance of the Adapter class,
     *    which will give you the a method to 'init' the cache.
     * 2. Use the 'default' property's 'Adapter' (and repeat step 1) or create
     *    an instance the cache using 'default' property's 'Cache' class.
     *
     * The problem here is that there is a nested export and import that when run
     * with a 'require' just returns the 'nested' default export. However, due to
     * the way that 'import' works, it returns the 'default' export as the 'default'
     *
     * ...self-referencing submodules are a pain...
     **/
    this.adapter = import('@next-boost/hybrid-disk-cache').then(({ Adapter }) => new Adapter(this.config));
    this.cache = this.adapter.then((a) => a.init());
  }

  async status(key: string): Promise<CacheStatus> {
    const cache = await this.cache;
    return (await cache.has(key)) as CacheStatus;
  }

  async has(key: string): Promise<boolean> {
    return (await this.status(key)) !== CacheStatus.MISS;
  }

  async get(key: string): Promise<Uint8Array | null> {
    if (!(await this.has(key))) {
      return null;
    }
    const cache = await this.cache;
    const cacheValue = (await cache.get(key))!;

    await cache.set(key, cacheValue);

    return cacheValue;
  }

  async set(key: string, resultImg: Uint8Array): Promise<void> {
    const cache = await this.cache;
    await cache.set(key, resultImg as Buffer);
  }

  async clear(): Promise<void> {
    const cache = await this.cache;
    await cache.purge();
  }
}
