import http from 'http';

const config = {
	port: Number(process.argv[2]) || 8080,
};

http.createServer((req, res) => {
	global.console.log(req.url);
	res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
	res.end(`Hello from port: ${config.port} and welcome to multikey-node-boilerplate!`);
}).listen(config.port, () => global.console.log(`Server is listening on port ${config.port}`));
