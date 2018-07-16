import http from 'http';
import child_process from 'child_process';

const config = {
	port: Number(process.argv[2]) || 3000,
};

const execComand = command => {
	return new Promise((resolve, reject) => {
		child_process.exec(command, (err, stdout, stderr) => {
			if (err) {
				global.console.error(`Child process failed with error code ${err.code}\nStderr: ${stderr}`);
				resolve(err);
			} else {
				reject(stdout);
			}
		});
	});
};

http.createServer((req, res) => {
	execComand('pmset -g batt | egrep "([0-9]+%).*" -o')
		.then(response => {
			res.write(JSON.stringify({ 'Battery life': response }));
			res.end();
		})
		.catch(error => {
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.end(error);
		});
}).listen(config.port, () => global.console.log(`Server is listening on port ${config.port}`));
