const fs = require('fs');
const path = require('path');
// env 文件 判断打包环境指定对应的服务器id
const envfile = process.env.NODE_ENV === 'prod' ? '../.env.prod' : '../.env.dev';
console.log(envfile)
// env环境变量的路径
const envPath = path.resolve(__dirname, envfile);
// env对象
const envObj = parse(fs.readFileSync(envPath, 'utf8'));
const SERVER_ID = parseInt(envObj['VUE_APP_SERVER_ID']);
console.log('SERVER_ID',SERVER_ID)
function parse(src) {
    // 解析KEY=VAL的文件
    const res = {};
    src.split('\n').forEach(line => {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        // eslint-disable-next-line no-useless-escape
        const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
        // matched?
        if (keyValueArr != null) {
            const key = keyValueArr[1];
            let value = keyValueArr[2] || '';
            
            // expand newlines in quoted values
            const len = value ? value.length : 0;
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n');
            }
            
            // remove any surrounding quotes and extra spaces
            value = value.replace(/(^['"]|['"]$)/g, '').trim();
            res[key] = value;
        }
    });
    return res;
}
/*
 *定义多个服务器账号 及 根据 SERVER_ID 导出当前环境服务器账号
 */
const SERVER_LIST = [
    {
        id: 0,
        name: 'A-测试环境',
        domain: 'https://mobile.jorn.club/',
        host: '49.235.171.14',
        port: 22,
        username: 'root',
        password: 'zIab6H5cBSyH',
        path: '/root/myapp/web/h5'
     },
    {
        id: 1,
        name: 'B-生产环境',
        domain: 'https://mobile.jorn.club/',// 域名
        host: '49.235.171.14',// ip
        port: 22,// 端口
        username: 'root', // 登录服务器的账号
        password: 'zIab6H5cBSyH2',// 登录服务器的账号
        path: '/root/myapp/web/h5'// 发布至静态服务器的项目路径
    },

];
 
module.exports = SERVER_LIST[SERVER_ID];