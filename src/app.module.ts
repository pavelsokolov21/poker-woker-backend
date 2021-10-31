import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtTokensModule } from './modules/jwt-tokens/jwt-tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_NAME}:${process.env.MONGO_DB_PASSWORD}@main-cluster.0lcsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    UserModule,
    AuthModule,
    JwtTokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
