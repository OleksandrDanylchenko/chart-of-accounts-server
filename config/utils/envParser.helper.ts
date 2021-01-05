import { join } from 'path';

export const getEnvArray = (
  envArrayString: string,
  delimiter = ','
): string[] => envArrayString.split(delimiter) || [];

export const getRuntimePaths = (env: string, envPaths: string[]): string[] =>
  env.toLocaleLowerCase() === 'production'
    ? envPaths.map((path) => path.replace('src', 'dist'))
    : envPaths;

export const getPath = (path: string): string => {
  return join(process.cwd(), path || '');
};

export const getPaths = (paths: string[]): string[] =>
  paths.map((p) => getPath(p));
