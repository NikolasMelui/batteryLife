import http from 'http';
import child_process from 'child_process';

const config = {
	port: Number(process.argv[2]) || 3000,
};

const execComand = (res, command) => {
	child_process.exec(command, (err, stdout, stderr) => {
		if (err) {
			console.error(`Child process failed with error code ${err.code}\nStderr: ${stderr}`);
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify({ 'Battery life': stdout }));
			res.end();
		}
	});
};

http.createServer((req, res) => {
	execComand(res, 'pmset -g batt | egrep "([0-9]+%).*" -o');
}).listen(config.port, () => global.console.log(`Server is listening on port ${config.port}`));
