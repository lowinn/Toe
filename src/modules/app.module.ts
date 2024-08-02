import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from "src/app.controller";
import GlobalExceptionHandler from 'src/common/exceptions/global-exceptions';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { DopplerService } from 'src/common/services/doppler/doppler.service';
import { RemoteService } from 'src/common/services/remote/remote.service';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.register(),
    , HttpModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionHandler
  }, RemoteService, DopplerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }

}
