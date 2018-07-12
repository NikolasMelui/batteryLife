import http from 'http';
import child_process from 'child_process';

const config = {
	port: Number(process.argv[2]) || 3000,
};

const execComand = data => {
	child_process.exec('pmset -g batt | egrep "([0-9]+%).*" -o', (err, stdout, stderr) => {
		if (err) {
			console.error(`Child process failed with error code ${err.code}`);
		} else {
			console.log(`Stdout: ${stdout}`);
		}
	});
};

http.createServer((req, res) => {
	const reqUrl = req.url;

	console.log(reqUrl);
	console.log(execComand());

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify({ hello: 'world' }));
	res.end();
}).listen(config.port, () => global.console.log(`Server is listening on port ${config.port}`));
