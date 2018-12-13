#!/usr/bin/env node
var cc =require('cli.config.js').system('pnote').default(require('./config.json'))
var ccc = require('cli.config.js')
var commander = require('commander')
var pnote = require('./index')
var path = require('path')
var fs = require('fs')

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//hist
require('history.node').record('pnote')

var program = commander.usage('\r\n'
    +'[path]\r\n'
    +'[path] [text]\r\n'
    +'[path] [yourFilePath] -f\r\n'
    +'ls\r\n'
    +'list\r\n'
    +'config -h')
    .option('-f --file', 'read text from a file')
    .option('-e --encode [utf-8]','read file encoding','utf-8')
    .parse(process.argv)

var firstCommand = program.args.length>0 ? program.args[0] : '/'
//config 
switch(firstCommand){
    case 'ls':
    case 'list':
        pnote.ls()
        break
    case 'config':
        var nArgs = []
        Object.assign(nArgs,process.argv)
        nArgs.remove('config')
        //console.log(nArgs)
        ccc.runCli(nArgs, 'pnote')
        break
    default:
        if(program.args.length > 1){
            if(program.file){
                //console.log(program.file)
                //console.log(program.encode)
                var rPath = path.resolve(process.cwd(),program.args[1])
                //console.log(rPath)
                if(!fs.existsSync(rPath)){
                    console.log('file[' + rPath + "] not exsits")
                }else{
                    fs.readFile(rPath,program.encode,(err,data)=>{
                        if(err){
                            console.log('read file error :['+ rPath +'] ' +err)
                        }else{
                            pnote.set(program.args[0],data)
                        }
                    })
                }
            }
            else{
                pnote.set(program.args[0],program.args[1])
            }
        }
        else{
            pnote.get(firstCommand)
        }
        break
}
