const start = (callback: (arg0: string) => void) => {
  setTimeout(() => {
    callback('Hello');
    setTimeout(() => {
      callback('And Welcome');
      setTimeout(() => {
        callback('To Async Await Using TypeScript');
      }, 1000);
    }, 1000);
  }, 1000);
};

const startAsync = async (callback: { (text: string): void; (arg0: string): void }) => {
  await wait(1000);
  callback('Hello');
  await wait(1000);
  callback('And Welcome');
  await wait(1000);
  callback('To Async Await Using TypeScript');
};

const wait = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

interface Dictionary<T> {
  readonly [x: string]: T;
}

type Data = {
  idx: number;
  path: string;
  title: string;
  description: string;
};

const MOCK = (toFail: boolean) =>
  new Promise<Data>((resolve, reject): void => {
    const data: Data = {
      idx: 1,
      path: '/blah/blah',
      title: 'Mock Me',
      description: 'Example of mock data',
    };

    if (toFail) resolve(data);
    else reject('Failed');
  });
