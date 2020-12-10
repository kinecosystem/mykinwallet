enum Environment {
	Prod,
	Test
}

// Change this value to switch environments
export const ENV = Environment.Prod;

const AGORA_URLS = new Map<number, string>([
	[Environment.Test, 'https://gateway.agorainfra.dev'],
	[Environment.Prod, 'https://gateway.agorainfra.net']
]);
export const AGORA_URL = AGORA_URLS.get(ENV);

const ENV_NAMES = new Map<number, string>([[Environment.Test, 'Test'], [Environment.Prod, 'Production']]);
export const ENV_NAME = ENV_NAMES.get(ENV);

const EXPLORER_PARAMS = new Map<number, string>([
	[Environment.Test, '?cluster=custom&customUrl=https%3A%2F%2Flocal.validator.agorainfra.dev'],
	[Environment.Prod, '']
]);
export const EXPLORER_URL_PARAMS = EXPLORER_PARAMS.get(ENV);
