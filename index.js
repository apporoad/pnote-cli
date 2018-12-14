
var requestify = require('requestify')
var cc =require('cli.config.js').system('pnote').default(require('./config.json'))
var open = require('open')



String.prototype.trim = function (char, type) {
    if (char) {
        if (type == 'left') {
            return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
        } else if (type == 'right') {
            return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};


exports.get = path=>{
    // path 
    if(!path)
        path=""
    var rPath = cc.get("site").trim('/','right') + "/" + path.trim('/','left')
    //console.log(rPath)
    requestify.post(rPath, { })
        .then(function(response) {
            console.log(response.body)
        });
}

exports.set = (path,text) =>{
    var rPath = cc.get("site").trim('/','right') + "/save"
    var pp =  '/'+ path.trim('/','left')

    //console.log(rPath)
    //console.log(pp)
    requestify.post(rPath, { path: pp, text: text })
	.then(function(response) {
        //console.log(response.body)
        if(response.body){
            console.log("set success!")
        }
    });
}

exports.open = path =>{
    if(!path)
        path=""
    var rPath = cc.get("site").trim('/','right') + "/" + path.trim('/','left')
    open(rPath)

}


exports.ls = ()=>{
    var rPath = cc.get("site").trim('/','right') + "/list?isAPI=true"
    //console.log(rPath)
    
    requestify.get(rPath, { })
	.then(function(response) {
        //console.log(response.body)
        if(response.body){
            //console.log(response.body)

            JSON.parse(response.body).forEach(element => {
                //console.log(element)
                console.log(element["path"])
            });
        }
    });
}