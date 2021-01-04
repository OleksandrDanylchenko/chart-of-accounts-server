// import {
//   getOsEnv,
//   getOsPath,
//   getOsPaths,
//   normalizePort,
//   toBool,
//   toNumber
// } from '../utils/path.helper';
//
// interface EnvConfig {
//   isProduction: boolean;
//   isDevelopment: boolean;
//   app: {
//     name: string;
//     port: number | string;
//     dirs: {
//       postgres: {
//         migrations: string[];
//         migrationsDir: string;
//         entities: string[];
//         entitiesDir: string;
//         subscribers: string[];
//         subscribersDir: string;
//       };
//     };
//   };
//   database: {
//     postgres: {
//       name: string;
//       type: string;
//       host: string;
//       port: number;
//       username: string;
//       password: string;
//       database: string;
//       logging: boolean;
//       synchronize: boolean;
//       migrationsRun: boolean;
//     };
//   };
// }
//
// const port = normalizePort(process.env.PORT || getOsEnv('APP_PORT'));
//
// const getRuntimePath = (entitiesPath: string[]): string[] =>
//   env.isProduction
//     ? entitiesPath.map((path) => path.replace('src', 'dist'))
//     : entitiesPath;
//
// const env: EnvConfig = {
//   isProduction: process.env.NODE_ENV === 'production',
//   isDevelopment: process.env.NODE_ENV === 'development',
//   app: {
//     name: getOsEnv('APP_NAME'),
//     port,
//     dirs: {
//       postgres: {
//         migrations: getRuntimePath(getOsPaths('TYPEORM_MIGRATIONS')),
//         migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
//         entities: getRuntimePath(getOsPaths('TYPEORM_ENTITIES')),
//         entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
//         subscribers: getOsPaths('TYPEORM_SUBSCRIBERS'),
//         subscribersDir: getOsPath('TYPEORM_SUBSCRIBERS_DIR')
//       }
//     }
//   },
//   database: {
//     postgres: {
//       name: getOsEnv('TYPEORM_CONNECTION_NAME'),
//       type: getOsEnv('TYPEORM_CONNECTION'),
//       host: getOsEnv('TYPEORM_HOST'),
//       port: toNumber(getOsEnv('TYPEORM_PORT')),
//       username: getOsEnv('TYPEORM_USERNAME'),
//       password: getOsEnv('TYPEORM_PASSWORD'),
//       database: getOsEnv('TYPEORM_DATABASE'),
//       logging: toBool(getOsEnv('TYPEORM_LOGGING') || 'false'),
//       synchronize: toBool(getOsEnv('TYPEORM_SYNCHRONIZE') || 'false'),
//       migrationsRun: toBool(getOsEnv('TYPEORM_MIGRATIONS_RUN') || 'true')
//     }
//   }
// };
//
// export default (): EnvConfig => env;
