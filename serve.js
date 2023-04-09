#!/usr/bin/node
//
// This script will run a local development server. This is useful when
// developing the theme.
//
// Usage:
// `serve.js` to use the default JSONResume example
// `serve.js <filename>` to open a particular resume file 

var http = require("http");
var fs = require('fs');
var args = require('optimist').argv;

var port = 8888;
http.createServer(async function (req, res) {
  if (req.url === '/') {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(await render());
  }
}).listen(port);

console.log("预览: http://localhost:8888/");
console.log("进行中..");

async function render() {
  try {
    var resume = args._.length
      ? JSON.parse(fs.readFileSync(args._[0], 'utf8'))
      : require("resume-schema").resumeJson;
    return await require("./index.js").render(resume);
  } catch (e) {
    // https://stackoverflow.com/questions/33655700/github-api-fetch-issues-with-exceeds-rate-limit-prematurely
    console.log(e.message);
    return "";
  }
}
