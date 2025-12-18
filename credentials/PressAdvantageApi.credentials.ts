import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PressAdvantageApi implements ICredentialType {
	name = 'PressAdvantageApi';
	displayName = 'Press Advantage Api';
	documentationUrl = 'https://github.com/velluto/pressadvantage_api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	} as IAuthenticateGeneric;
}
