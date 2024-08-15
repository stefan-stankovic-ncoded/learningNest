import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import authConfiguration from './auth/auth.configuration';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import databaseConfiguration from './configuration/database.configuration';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true,
      load: [authConfiguration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      ...databaseConfiguration(),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
