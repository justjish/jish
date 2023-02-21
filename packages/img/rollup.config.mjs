import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import esbuild from 'rollup-plugin-esbuild';
const external = [
  'fs',
  'path',
  'react',
  'react-dom',
  '@cloudflare/kv-asset-handler',
  '@cloudflare/workers-types/experimental',
  'crypto',
  'assert',
  'constants',
  'stream',
  'query-string',
  'clsx',
  'react/jsx-runtime',
];
/** @type {import('rollup-plugin-typescript2').RPT2Options} */
const tsSettings = {
  module: 'esnext',
  tsconfigOverride: {
    exclude: ['node_modules', 'build', 'tests'],
  },
};
/** @type {Array<import('rollup').RollupOptions>} */
export default [
  {
    input: 'src/img.react.tsx',
    output: [
      {
        dir: '.',
        format: 'es',
        exports: 'named',
      },
    ],
    external,
    plugins: [
      esbuild({
        target: 'esnext',
        tsconfig: './tsconfig.json',
        sourceMap: true,
        format: 'esm',
        jsx: 'automatic',
        loaders: {
          '.json': 'json',
          '.tsx': {
            loader: 'tsx',
            banner: "import React from 'react'",
          },
          '.ts': {
            loader: 'ts',
            include: /\.tsx?$/,
            tsconfig: './tsconfig.json',
          },
        },
      }),
      // peerDepsExternal(),
      // json(),
      // resolve(),
      // typescript(tsSettings),
      // commonjs({
      //   sourceMap: true,
      // }),
      // replace({
      //   preventAssignment: true,
      //   sourceMap: true,
      // }),
      // terser({
      //   keep_fnames: true,
      //   sourceMap: true,
      // }),
    ],
  },
  {
    input: 'src/img.node.ts',
    output: [
      {
        dir: '.',
        format: 'es',
        strict: true,
        sourcemap: true,
        exports: 'auto',
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        preferBuiltins: false,
      }),
      typescript(tsSettings),
      commonjs({
        sourceMap: true,
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
      }),
      terser({
        keep_fnames: true,
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/img.pure.ts',
    output: [
      {
        dir: '.',
        format: 'es',
        strict: true,
        sourcemap: true,
        exports: 'auto',
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        preferBuiltins: false,
      }),
      typescript(tsSettings),
      commonjs({
        sourceMap: true,
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
        include: ['node_modules/jpeg-js/**/*.js'],
        values: {
          'Buffer.from': 'new Uint8Array',
        },
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
      }),
      terser({
        keep_fnames: true,
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/img.worker.ts',
    output: [
      {
        dir: '.',
        format: 'es',
        sourcemap: true,
        strict: true,
        exports: 'auto',
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({
        preferBuiltins: false,
      }),
      typescript(tsSettings),
      commonjs({
        sourceMap: true,
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
        include: ['node_modules/jpeg-js/**/*.js'],
        values: {
          'Buffer.from': 'new Uint8Array',
        },
      }),
      replace({
        preventAssignment: true,
        sourceMap: true,
      }),
      terser({
        keep_fnames: true,
        sourceMap: true,
      }),
    ],
  },
];
