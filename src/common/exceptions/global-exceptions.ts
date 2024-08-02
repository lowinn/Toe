import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import * as Honeybadger from '@honeybadger-io/js';
import { Request, Response } from 'express';



@Catch()
export default class GlobalExceptionHandler implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly configService: ConfigService) {
		// Initialize Honeybadger
		Honeybadger.configure({
			apiKey: this.configService.get('HONEYBADGER_API_KEY'),
			environment: this.configService.get('HONEYBADGER_ENVIRONMENT'),
		});
	 }

	catch(exception: any, host: ArgumentsHost): void {
		// In certain situations `httpAdapter` might not be available in the
		// constructor method, thus we should resolve it here.
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);


		// Report error to Honeybadger
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
