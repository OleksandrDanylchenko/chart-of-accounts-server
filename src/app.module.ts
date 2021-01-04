import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import envConfig from '../config/envConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig], cache: true }),
    TypeOrmModule.forRoot()
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
