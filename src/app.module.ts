import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import authConfiguration from './config/auth.configuration';
import databaseConfiguration from './config/database.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      load: [authConfiguration, databaseConfiguration],
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: authConfiguration()['secret-key'],
      signOptions: {
        expiresIn: '15m',
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
