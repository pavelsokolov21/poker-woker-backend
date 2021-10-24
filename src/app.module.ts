import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * @todo Make login and password as env
 */
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Pavel_Sokolov:5gzNWC0xTgAk2wcG@main-cluster.0lcsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
