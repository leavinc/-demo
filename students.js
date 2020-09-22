// 不关心业务，只针对单一文件进行增删改查
// 数据操作文件模块
var fs = require('fs');

var dbPath = './db.json';
// 获取所有学生列表
exports.find = function(callback){
    // readFile方法是异步的,如果要获取一个函数中异步操作的结果，则必须通过回调函数来获取
    fs.readFile(dbPath,'utf8', function(err,data){
        if(err){
            return callback(err);
        }
        callback(null,JSON.parse(data).students);
    });
};

// 根据id获取一个学生对象
exports.findById = function(id, callback){
    fs.readFile(dbPath,'utf8', function(err,data){
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var ret = students.find(function(item){
            return item.id == id;
        });
        callback(null,ret);
    });
};

// 添加保存学生
exports.save = function(student,callback){
    fs.readFile(dbPath,'utf8', function(err,data){
        if(err){
            return callback(err);
        }

        var students = JSON.parse(data).students;
        // 处理id唯一
        
        student.id = parseInt(students[students.length - 1].id) + 1;
       
        
        students.push(student);
        var fileData = JSON.stringify({
            students:students
        });
        fs.writeFile(dbPath, fileData ,function(err){
            if(err){
                return callback(err);
            }
            callback(null);
        });
    });
};


// 更新学生
exports.updateById = function(student, callback){
    fs.readFile(dbPath,'utf8', function(err,data){
        if(err){
            return callback(err);
        }
        student.id = parseInt(student.id);
        var students = JSON.parse(data).students;
        // ES6中的一个数组方法：find() ，接受一个函数作为参数，当符合条件时，会终止便利同时返回遍历项
        var stu = students.find(function(item){
            return item.id === student.id;
        });

        for( var key in student){
            stu[key] = student[key];
        }
        
        var fileData = JSON.stringify({
            students:students
        });
        fs.writeFile(dbPath, fileData ,function(err){
            if(err){
                return callback(err);
            }
            callback(null);
        });
    });
};


// 删除学生
exports.deleteById = function(id, callback){
    fs.readFile(dbPath,'utf8',function(err, data){
        if(err){
            return callback(err);  
        }
        var students = JSON.parse(data).students;
        id = parseInt(id);
        // 返回下标
        var deleteId = students.findIndex(function(item){
            return item.id === id;
        });
        students.splice(deleteId,1);

        var fileData = JSON.stringify({
            students:students
        });
        fs.writeFile(dbPath, fileData ,function(err){
            if(err){
                return callback(err);
            }
            callback(null);
        });
    });
};