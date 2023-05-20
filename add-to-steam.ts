import { readVdf, writeVdf } from 'steam-binary-vdf';
import fs from 'fs';
import path from 'path';

const shortcuts_to_add = {
	'Solo Lobby Add Rules': path.join(`${process.env.PWD}`, 'add-rules.out'),
	'Solo Lobby Remove Rules': path.join(`${process.env.PWD}`, 'remove-rules.out'),
	'Enable iptables': path.join(`${process.env.PWD}`, 'enable-iptables.out'),
	'Disable iptables': path.join(`${process.env.PWD}`, 'disable-iptables.out')
};
const userdataPath = path.join(
	`${process.env.HOME}`,
	'.steam',
	'steam',
	'userdata'
);

const user_ids = fs.readdirSync(userdataPath);
user_ids
	.forEach((user_id) => {
		const shortcutsPath = path.join(
			userdataPath,
			user_id,
			'config',
			'shortcuts.vdf'
		);
		if (!fs.existsSync(shortcutsPath)) return;
		console.log(`Add shortcuts to ${shortcutsPath}`);
		const inBuffer = fs.readFileSync(shortcutsPath);
		const { shortcuts }:any = readVdf(inBuffer);
		Object.entries(shortcuts_to_add)
			.map(([AppName, exe]) => ({ AppName, exe, StartDir: process.env.PWD }))
			.forEach(({ AppName, exe, StartDir }) => {
				const _i = Object.entries(shortcuts).map(([index, shortcut]:any) => (
					shortcut.AppName === AppName ? index : undefined
				)).filter((index) => (typeof index != 'undefined'))[0];
				shortcuts[`${typeof _i != 'undefined' ? _i : Object.entries(shortcuts).length}`] = { AppName, exe, StartDir };
			});

		const outBuffer = Buffer.concat([Buffer.from([0]), Buffer.from('shortcuts'), Buffer.from([0]), writeVdf(shortcuts), Buffer.from([0x08, 0x08])]);

		fs.writeFileSync(shortcutsPath, outBuffer);
	});
