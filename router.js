var fs = require('fs');
var Students = require('./students');
var bodyParser = require('body-parser');

// express提供了Router（）方法来封装路由
var express = require('express');

// 创建一个路由容器
var router = express.Router();

// 更新测试
// Students.update({
//     id:11,
//     name:'ss',
//     age:'100'
// },function(err){
//     if(err){
//         return console.log('shibai');
//     }
//     console.log('chenggong');
// });

// 把路由都挂载到路由容器中
router.get('/students', function(req, res){
    // readfile的第二个参数是可选的，传入utf-8就是告诉他把读取到的文件直接按照utf-8编码转成我们能认识的字符
    // 除了这样来转化之外，也可以通过data.toString（）方法
      
    // fs.readFile('./db.json','utf8',function(err,data){
    //     if(err){
    //         return res.status(500).send('server error');
    //     }
    //     res.render('index.html',{
    //         fruits:[
    //             '苹果',
    //             '香蕉',
    //             '橘子'
    //         ],
    //         students:JSON.parse(data).students
    //     });
    // });
    
    Students.find(function(err,students){
        if(err){
            return res.status(500).send('server error');
        }
        res.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '橘子'
            ],
            students:students
        });
    });
});

router.get('/students/new', function(req, res){

    res.render('new.html');
});

router.post('/students/new', function(req, res){
    
    // console.log(req.body);
    // 1.获取表单数据
    // 2.处理数据（将数据保存到db.json文件中以持久化）
    // 3.发送响应
    //   对于文件中的数据，先读取出来转成对象，然后往对象中 push 数据，然后再把对象转为字符串，再把字符串再次写入文件
    
    Students.save(req.body,function(err){
        if(err){
            return res.status(500).send('server error');
        }
        res.redirect('/students');
    });


});

// 渲染编辑学生页面
router.get('/students/edit', function(req, res){
    Students.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('server error'); 
        }
        res.render('edit.html', {
            student:student
        });
    });
    
});

router.post('/students/edit', function(req, res){
    // 1.获取表单数据
    //   req.body
    // 2.更新
    //   Student.update（）
    // 3.发送响应
    
    Students.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error'); 
        }
        res.redirect('/students');
    });
});

router.get('/students/delete', function(req, res){
    // 1.获取要删除的id
    // 2.根据id执行删除操作
    // 3.根据操作结果发送响应数据
    Students.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('server error'); 
        }
        res.redirect('/students');
    });
});

module.exports = router;
