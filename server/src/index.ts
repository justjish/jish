import * as functions from 'firebase-functions';
import datasets from '../../src/datasets/index';
import * as fs from 'fs';
import { validateObjectShape } from 'typescript-object-validator';

export const getList = functions.https.onCall(() => datasets.lookup);
export const getData = functions.https.onCall((data, ctx) => {
  console.log(data);
  console.log(datasets.lookup[parseInt(data)].path);
  const x = fs.readFileSync(datasets.lookup[parseInt(data)].path);
  console.log(x);
  return x;
});

export const getDataStream = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    console.log();
    const dataValidator = validateObjectShape('Data API Response', req.body, { id: 'string' });
    if (dataValidator.valid) fs.createReadStream(datasets.lookup[parseInt(dataValidator.result.id) - 1].path).pipe(res);
    res.sendStatus(400);
  }
});
