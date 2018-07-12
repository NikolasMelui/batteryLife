import http from 'http';

const config = {
	port: Number(process.argv[2]) || 3000,
};

http.createServer((req, res) => {
	const reqUrl = req.url;
	console.log(reqUrl);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify({ hello: 'world' }));
	res.end();
}).listen(config.port, () => global.console.log(`Server is listening on port ${config.port}`));
