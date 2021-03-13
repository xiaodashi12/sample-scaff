#!/usr/bin/env node
//node cli应用入口必须要有这样的文件夹
//如果是linux或者mac系统还要修改文件的读写权限755
//具体就是通过chmod 755cli.js或者chmod u+x *.js实现修改
console.log("cli working")
//脚手架工作过程
//1、通过命令行交互询问用户问题
//2、根据用户的回答结果生成文件
//命令行询问引入inquirer模块
//sudo yarn add inquirer
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')
inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'Project name',

    }
]).then(answers=>{
    //根据用户的回答生成文件
    //模版目录
    const tmplDir = path.join(__dirname, "templates")
    //目标目录
    const destDir = process.cwd()
    //将模版下的文件全部输出到目标目录
    fs.readdir(tmplDir, (err, files)=>{
        if(err) throw err
        files.forEach(file=>{
            //通过模版引擎渲染对应的文件
            ejs.renderFile(path.join(tmplDir, file), answers, (err, result)=>{
                if(err) throw err
                console.log(result)
            })
            console.log(file)
        })
    })
    console.log(answers)
})