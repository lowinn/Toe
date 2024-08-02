import { Injectable } from "@nestjs/common";
import doppler from "src/shared/doppler";

@Injectable()
export class DopplerService {
	async getDoppler() {
		const res=  await doppler().projects.list();
		return JSON.stringify(res);
	}
}
