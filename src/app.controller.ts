import { Controller, Get } from "@nestjs/common";
import type { Observable } from 'rxjs';
import { DopplerService } from 'src/common/services/doppler/doppler.service';
import { RemoteService } from 'src/common/services/remote/remote.service';
import logger from 'src/common/utils/logger';


@Controller()
export class AppController {
	constructor(private readonly remoteService: RemoteService, private readonly doppler:DopplerService) { }

	@Get()
	getHello(): Observable<any> {
		logger.info(process.env.HONEYBADGER_API_KEY);
		const response = this.remoteService.request('https://jsonplaceholder.typicode.com/post', 'GET', {});

		return response;
	}


	@Get('/doppler')
	getDoppler() {
		return this.doppler.getDoppler();
	}
}
