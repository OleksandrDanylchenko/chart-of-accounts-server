import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  getEnvArray,
  getPaths,
  getRuntimePaths
} from '../../utils/envParser.helper';
import { AppConfigService } from '../../app/config.service';

@Injectable()
export class PostgresConfigService {
  constructor(
    private configService: ConfigService,
    private appConfigService: AppConfigService
  ) {}

  get name(): string {
    return this.configService.get<string>('postgres.name');
  }

  get type(): string {
    return this.configService.get<string>('postgres.type');
  }

  get host(): string {
    return this.configService.get<string>('postgres.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('postgres.port'));
  }

  get username(): string {
    return this.configService.get<string>('postgres.username');
  }

  get password(): string {
    return this.configService.get<string>('postgres.password');
  }

  get database(): string {
    return this.configService.get<string>('postgres.database');
  }

  get logging(): boolean {
    return this.configService.get<boolean>('postgres.logging');
  }

  get synchronize(): boolean {
    return this.configService.get<boolean>('postgres.synchronize');
  }

  get migrationsRun(): boolean {
    return this.configService.get<boolean>('postgres.migrationsRun');
  }

  get migrations(): string[] {
    const migrations = this.configService.get<string>('postgres.migrations');
    const migrationsPaths = getPaths(getEnvArray(migrations));
    return getRuntimePaths(this.appConfigService.env, migrationsPaths);
  }

  get migrationsDir(): string[] {
    const migrationsDirs = this.configService.get<string>(
      'postgres.migrationsDir'
    );
    const migrationsDirsPaths = getPaths(getEnvArray(migrationsDirs));
    return getRuntimePaths(this.appConfigService.env, migrationsDirsPaths);
  }

  get entities(): string[] {
    const entities = this.configService.get<string>('postgres.entities');
    const entitiesPaths = getPaths(getEnvArray(entities));
    return getRuntimePaths(this.appConfigService.env, entitiesPaths);
  }

  get entitiesDir(): string[] {
    const entitiesDir = this.configService.get<string>('postgres.entitiesDir');
    const entitiesDirPaths = getPaths(getEnvArray(entitiesDir));
    return getRuntimePaths(this.appConfigService.env, entitiesDirPaths);
  }

  get subscribers(): string[] {
    const subscribers = this.configService.get<string>('postgres.subscribers');
    const subscribersPaths = getPaths(getEnvArray(subscribers));
    return getRuntimePaths(this.appConfigService.env, subscribersPaths);
  }

  get subscribersDir(): string[] {
    const subscribersDir = this.configService.get<string>(
      'postgres.subscribersDir'
    );
    const subscribersDirPaths = getPaths(getEnvArray(subscribersDir));
    return getRuntimePaths(this.appConfigService.env, subscribersDirPaths);
  }
}
