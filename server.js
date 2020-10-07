
const bodyParser = require('body-parser');
const WechatAPI = require('wechat-api');
const wechat = require('co-wechat');
const OAuth = require('co-wechat-oauth');
const conf = {
    appid:'wxedd5ffabdb1d3637',
    appsecret:'925d93956d7475311b91ab56cbf92644',
    token:'jorntest'
}
const oauth = new OAuth(conf.appid, conf.appsecret,
    // async function (openid) {
    //     return await ClientToken.getToken(openid)
    // },
    // async function (openid, token) {
    //     return await ClientToken.setToken(openid, token)
    // }
)
var api = new WechatAPI(conf.appid, conf.appsecret);
function AppServer(app){
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());
    //微信验证
   
app.use('/wechat', wechat(conf,function(req,res,next){
    console.log(req)
    res.reply('hehe');
    next()
}).middleware(
    async message => {
        console.log('wechat:', message)
        return 'Hello World ' + message.Content
    }
));

    app.use('/test', function(req, res) {
        res.json({ custom: 'response' });
    });

}
module.exports={
    AppServer
}