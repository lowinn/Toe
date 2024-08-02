import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import type HttpMethod from 'src/common/interfaces/types';

@Injectable()
export class RemoteService {
	constructor(private httpService: HttpService) { }
	request(uri: string, method: HttpMethod, params: any) {

		try {
			const request = this.httpService.request({
				url: uri,
				method: method,
				data: params,
			});

			return request.pipe(map((response) => response.data));
		} catch (error) {
			console.log(error);
		}
	}
}
