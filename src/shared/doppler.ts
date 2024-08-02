import DopplerSDK from "@dopplerhq/node-sdk";
import { ConfigService } from "@nestjs/config";
import logger from 'src/common/utils/logger';

function doppler() {
	return new DopplerSDK({
		accessToken: process.env.DOPPLER_TOKEN,
	});
}

//logger.info(new ConfigService().get("doppler.accessToken"))

export default doppler;
