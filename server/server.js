var http = require('http');
var url = require('url');
var express = require('express');
var fs = require('fs');
var path = require("path");

function start(route, handle) {
    function onRequest(req, res) {
        var postData="";
        var pathname =url.parse(req.url).pathname;
        switch(req.method) {
            case 'GET':
                postData += url.parse(req.url).query;
                req.setEncoding("utf8");
                route(handle, pathname, res, postData);
                break;

            case 'POST':
                req.addListener('data', function(postDateChunk) {
                    postData += postDateChunk;
                });
                req.addListener('end', function() {
                    route(handle, pathname, res, postData);
                });
                break;
        };
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}


 exports.start = start;




// 注册域名；
// 购买服务器，获取ip；
// 配置hosts文件，将域名映射到IP上；(本地端口)
// 访问域名就会解析到相应的IP上；
// 配置 nginx.config 文件，设置流量访问根目录