import { readVdf, writeVdf } from "steam-binary-vdf";
import fs from "fs";
import path from "path";

const shortcuts_to_add = {
	'Solo Lobby Add Rules':path.join(`${process.env.PWD}`,'add-rules.out'),
	'Solo Lobby Remove Rules':path.join(`${process.env.PWD}`,'remove-rules.out'),
	'Enable iptables':path.join(`${process.env.PWD}`,'enable-iptables.out'),
	'Disable iptables':path.join(`${process.env.PWD}`,'disable-iptables.out')
}
const userdataPath = path.join(
	`${process.env.HOME}`,
	".steam",
	"steam",
	"userdata"
);


const user_ids = fs.readdirSync(userdataPath);
user_ids.forEach((user_id)=>{
	const shortcutsPath = path.join(
		userdataPath,
		user_id,
		"config",
		"shortcuts.vdf"
	)
	const inBuffer = fs.readFileSync(shortcutsPath);
	const shortcuts:any = readVdf(inBuffer);
	Object.entries(shortcuts_to_add)
		.map(([AppName,exe])=>({AppName,exe}))
		.filter(({AppName})=>!(
			Object.entries(shortcuts || {})?.filter((shortcut:any)=>(shortcut.AppName == AppName))
		))
		.forEach(({AppName,exe})=>{
			shortcuts.push({AppName,exe});
		})

	const outBuffer = writeVdf(shortcuts);

	fs.writeFileSync(shortcutsPath, outBuffer);
})

