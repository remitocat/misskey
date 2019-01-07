import { request } from 'https';
const { sign } = require('http-signature');
import { URL } from 'url';
import * as debug from 'debug';
const crypto = require('crypto');
const { lookup } = require('dns-lookup-cache');

import config from '../../config';
import { ILocalUser } from '../../models/user';
import { publishApLogStream } from '../../stream';

const log = debug('misskey:activitypub:deliver');

export default (user: ILocalUser, url: string, object: any) => new Promise(async (resolve, reject) => {
	log(`--> ${url}`);

	const timeout = 10 * 1000;

	const { protocol, host, hostname, port, pathname, search } = new URL(url);

	const data = JSON.stringify(object);

	const sha256 = crypto.createHash('sha256');
	sha256.update(data);
	const hash = sha256.digest('base64');

	const addr = await resolveAddr(hostname).catch(e => reject(e));
	if (!addr) return;

	const req = request({
		protocol,
		hostname: addr,
		setHost: false,
		port,
		method: 'POST',
		path: pathname + search,
		timeout,
		headers: {
			'Host': host,
			'User-Agent': config.user_agent,
			'Content-Type': 'application/activity+json',
			'Digest': `SHA-256=${hash}`
		}
	}, res => {
		log(`${url} --> ${res.statusCode}`);

		if (res.statusCode >= 400) {
			reject(res);
		} else {
			resolve();
		}
	});

	sign(req, {
		authorizationHeaderName: 'Signature',
		key: user.keypair,
		keyId: `${config.url}/users/${user._id}/publickey`,
		headers: ['date', 'host', 'digest']
	});

	// Signature: Signature ... => Signature: ...
	let sig = req.getHeader('Signature').toString();
	sig = sig.replace(/^Signature /, '');
	req.setHeader('Signature', sig);

	req.on('timeout', () => req.abort());

	req.on('error', e => {
		if (req.aborted) reject('timeout');
		reject(e);
	});

	req.end(data);

	//#region Log
	publishApLogStream({
		direction: 'out',
		activity: object.type,
		host: null,
		actor: user.username
	});
	//#endregion
});

/**
 * Resolve address (with cached, asynchrony)
 */
export async function resolveAddr(domain: string): Promise<string> {
	const addrs = await resolveAddrs(domain);
	return addrs[0];
}

export function resolveAddrs(domain: string): Promise<string[]> {
	return new Promise((res, rej) => {
		lookup(domain, { all: true }, (error: any, results: any[]) => {
			if (error) return rej(error);
			return res(results.map(result => result.address));
		});
	});
}
