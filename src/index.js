import http from 'http';
import child_process from 'child_process';

const config = {
	port: Number(process.argv[2]) || 3000,
};

const serverResponses = message => {
	return {
		resolve: {
			statusCode: 200,
			message,
		},
		reject: {
			statusCode: 500,
			message,
		},
	};
};

const chooseOS = () => {
	switch (process.platform) {
		case 'linux':
			return 'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|time to empty|to full|percentage"';
		case 'darwin':
			return 'pmset -g batt | egrep "([0-9]+%).*" -o';
		case 'win32':
			return 'WMIC Path Win32_Battery';
		default:
			return '';
	}
};

const execComand = command =>
	new Promise((resolve, reject) =>
		child_process.exec(
			command,
			(err, stdout) => (!err ? resolve(serverResponses(stdout).resolve) : reject(serverResponses(err).reject))
		)
	);

http.createServer(async (req, res) => {
	const result = [];
	try {
		result.push(await execComand(chooseOS()));
	} catch (err) {
		result.push(serverResponses(err).reject);
		console.log(`The error:\n${err}`);
	}
	res.writeHead(result[0].statusCode, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify({ 'Battery life': result[0].message }));
	res.end();
}).listen(config.port, () => global.console.log(`Server is listening on port ${config.port}`));
