export default () => ({
	port: parseInt(process.env.APP_PORT, 10) || 3000,
	Honeybadger:{
		apiKey: process.env.HONEYBADGER_API_KEY,
		environment: process.env.HONEYBADGER_ENVIRONMENT
	},
	doppler: {
		accessToken: process.env.DOPPLER_TOKEN
	}
  });


