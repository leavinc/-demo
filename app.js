var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

// 处理静态资源
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/',express.static('./public/'));
// 模板引擎
app.engine('html',require('express-art-template'));
// body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
// 配置模板殷勤和 body-parser 一点要在挂载路由之前
app.use(router);


app.listen(3000,function(){
    console.log('crud express -------');
});


// ## 起步
//   -初始化
//   -模板处理
// ##路由设计
//   | 请求方法 | 请求路径 | get参数 | post参数 | 备注 |
//   |----------|---------|---------|---------|------|
//   |GET       |/students|         |         |渲染首页|
//   |GET       |/students/new|     |         |渲染添加学生|
//   |POST      |/students|         |name、age、gender、hobbies|
//   