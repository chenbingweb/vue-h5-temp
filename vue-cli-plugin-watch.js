const fs = require('fs');
const path = require("path");

module.exports = (api, projectOptions) => {
    api.registerCommand('watch', {
        description: 'watch plugin for vue cli 3',
        usage: 'vue-cli-service watch',
        options: {
  
      }
    }, (args) => {
      // 输出传入的参数
    if(args['_'].length)
    {
        let comm = args['_'][0];
        let docomm = args['_'][1];
        let store =  args['_'][2];
        //创建新页面
        if(comm=='page')
        {
            //模板路径
            let tempDir = '/temp'
            tempDir = path.resolve(__dirname+tempDir);
            let createPagePath ='/src/pages/'+docomm;
            if(isDirExis(createPagePath))
            {
               
                if(store=='store')
                {
                    createStore(store,docomm)
                }
                else
                {
                    console.log('当前目录已存在')
                }

            }
            else
            {
                console.log("******开始创建******")
                //同步创建文件夹
                fs.mkdirSync(path.resolve(__dirname+createPagePath));
                createFiles(tempDir,path.resolve(__dirname+createPagePath))
                createStore(store,docomm)
                // console.log(createPagePath)
            }
           
        }
    }
    // console.log('watch 命令注册成功')
    
    // console.log(args)
    })
  }
  //穿件store模板
  function createStore(store,docomm){
    if(store=='store')
    {
        let createStorePath = path.resolve(`${__dirname}/src/store/modules/${docomm}.js`);
        let tempDirStorePaht =  path.resolve(`${__dirname}/temp/storeTemp.js`);
        console.log(createStorePath)
        console.log(tempDirStorePaht)
        var data = fs.readFileSync(tempDirStorePaht)    
        fs.writeFileSync(createStorePath,data);
        // fs.rename(tempDirStorePaht,createStorePath+docomm,(err)=>{
        //     if(err){
        //         console.log(err)
        //     }
        // })
        //readDir(tempDirStorePaht,createStorePath)
    }
  }
  //创建page
  function createFiles(tempDir,savePath){
    var t_r_filelist = fs.readdirSync(tempDir);
    console.log(t_r_filelist)
    t_r_filelist = t_r_filelist.filter(item=>{
        return item!== 'storeTemp.js'
    })
    t_r_filelist.forEach(item=>{
        readDir(tempDir+'/'+item,savePath)
    })
    console.log("******创建完成******")
  }
  //拷贝文件
  function readDir(url,savePath){
    const extName = path.extname(url)
    const fileName = path.basename(url)
    const dirName = path.dirname(url)
    var data = fs.readFileSync(dirName+'/'+fileName)    
    fs.writeFileSync(`${savePath}/${fileName}`,data);
   
  }
  //判断是否存在某个文件夹
  function isDirExis(dir){
   let tempDir = path.resolve(__dirname+dir);
   return fs.existsSync(tempDir)

  }