var express = require('express');
var http = require('http');
var https = require('https');
var request = require('request');
var app = express();

app.get('/getNewsByCity', function (req, res) {
    var end = Math.floor(new Date().getTime() / 1000);
    var start = end - 604800;   //7天之前
    console.log(req.query.city, start, end);
    var options = { method: 'GET',
    url: 'http://api01.idataapi.cn:8000/article/idataapi',
    qs: 
    { kw: req.query.city,
      KwPosition: '1',
      kwMode:'and',
      sentiment: '1',
      appCode: 'qq.com,163.com,sina.cn',
      catLabel1: '旅游',
      publishDateRange: start+','+end,
      apikey: '1RhYtKCACm5DOCyH9QDKsjgkKSqQC2NApTz05VbsDxp13XwkmX2DWSa6ORQU14xE' }
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      // console.log(body);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1');
      res.header("Content-Type", "application/json;charset=utf-8");
      res.send(body);
    });
}).on('error', function () {
    console.error(e);
})

app.get('/getCurrentWeather', function (req, res) {
  var options = { method: 'GET',
    url: 'https://api.seniverse.com/v3/weather/now.json',
    qs: 
    { key: 'S2jbdqhuxiGDJE87i',
      location: req.query.city,
      language: 'zh-Hans',
      unit: 'c' }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.send(body);
  });
}).on('error', function () {
  console.error(e);
})


app.get('/getWeatherForecast', function (req, res) {
  var options = { method: 'GET',
    url: 'https://api.seniverse.com/v3/weather/daily.json',
    qs: 
    { key: 'S2jbdqhuxiGDJE87i',
      location: req.query.city,
      language: 'zh-Hans',
      unit: 'c',
      start: '0' }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.send(body);
  });
}).on('error', function () {
  console.error(e);
})

app.get('/getLifeSuggestion', function (req, res) {
  var options = { method: 'GET',
    url: 'https://api.seniverse.com/v3/life/suggestion.json',
    qs: 
    { key: 'S2jbdqhuxiGDJE87i',
      location: req.query.city,
      language: 'zh-Hans' }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.send(body);
  });
}).on('error', function () {
  console.error(e);
})

app.get('/travelHelper', function (req, res) {
  res.sendfile(`${__dirname}/travelHelper.html`)
}).on('error', function () {
  console.error(e);
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("访问地址 http://127.0.0.1:%s/getNewsByCity", port)
})
