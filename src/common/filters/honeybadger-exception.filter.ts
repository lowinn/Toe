import * as Honeybadger from '@honeybadger-io/js';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch()
export class HoneybadgerExceptionFilter implements ExceptionFilter {

	constructor(private readonly configService: ConfigService) {

		// Initialize Honeybadger
		Honeybadger.configure({
			apiKey: this.configService.get('HONEYBADGER_API_KEY'),
			environment: this.configService.get('HONEYBADGER_ENVIRONMENT'),
		});
	}

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		const status = exception.status || 500;

		// Report error to Honeybadger
		Honeybadger.notify(exception, {
			request: {
				method: request.method,
				url: request.url,
				headers: request.headers,
				body: request.body,
			},
			response: {
				statusCode: response.statusCode,
			},
		});

		response.status(status).json({
			statusCode: status,
			message: exception.message || 'Internal server error',
		});
	}
}
