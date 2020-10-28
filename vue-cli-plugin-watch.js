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
                    if(isDirExis(`/src/store/modules/${docomm}.js`))
                    {
                        console.log(`${docomm}文件，已经在store/modules文件夹已经存在`)
                    }
                    else
                    {
                        createStore(store,docomm)
                    }
                    
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
                //添加路由
                createRouterConfig(docomm)
                console.log(createPagePath)
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
        createStoreConfig(docomm)
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
  //创建router配置
  function createRouterConfig(dirname){
    var data = fs.readFileSync(`${__dirname}/src/routers/routersConfig.js`)
    let str = `import ${dirname} from '../pages/${dirname}/index.vue'\t\r`
    data = addString(data,'/*imortant*/',str)
    let pstr = `{
        path: '${dirname=='index'?'/':'/'+ getKebabCase(dirname)}',
        name: '${dirname}',
        component:${dirname},
        meta:{
            tabbar:false,
            title:'页面标题'
        },
        children: [
            
        ],
    },\t\t\r`
    data = addString(data,'/*router*/',pstr)
    fs.writeFileSync(`${__dirname}/src/routers/routersConfig.js`,data);
  }
  //动态添加vuex配置
  function createStoreConfig(dirname){
    var data = fs.readFileSync(`${__dirname}/src/store/index.js`);
    //import player from "./modules/player"
    let str = `import ${dirname} from './modules/${dirname}'\t\r`;
    data = addString(data,'/*store*/',str)
    let moduleStr = `${dirname},\t\r`
    data = addString(data,' /*modules*/',moduleStr)
    fs.writeFileSync(`${__dirname}/src/store/index.js`,data);
  }
  function addString(data,flag,str){
    let importantIndex  = data.toString().indexOf(flag)
     data = data.slice(0,importantIndex)+str+data.slice(importantIndex);
     return data
  }
  //驼峰转烤串
  function getKebabCase( str ) {
    return str.replace( /[A-Z]/g, function( i ) {
        return '-' + i.toLowerCase();
    })
  }