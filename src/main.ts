import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import GlobalExceptionHandler from 'src/common/exceptions/global-exceptions';
import { HoneybadgerExceptionFilter } from 'src/common/filters/honeybadger-exception.filter';
import logger from 'src/common/utils/logger';
import { AppModule } from "src/modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  // Register the GlobalExceptionHandler
  app.useGlobalFilters(new GlobalExceptionHandler( {httpAdapter}, configService ));

  await app.listen(configService.get('port'));
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
