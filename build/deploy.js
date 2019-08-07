var path = require('path');
var fs =require('fs');
var cmd = require("child_process");
var deployConf = require("./config/releaseConfig.json");
var projectName = deployConf.projectName;
var deployContent = deployConf.deployContent;
//移动favicon图片到common目录下
let commonCategoryPath = `${process.cwd()}/${projectName}-output/common`;
let oldName = `${process.cwd()}/${projectName}-output/favicon.png`;
let newName = `${process.cwd()}/${projectName}-output/common/favicon.png`;
if(!fs.existsSync(commonCategoryPath)) {
    fs.mkdirSync(commonCategoryPath)    
}
if(fs.existsSync(oldName)) {
    try {
        fs.renameSync(oldName, newName);
        console.log("favicon文件处理成功");
    } catch(e) {
        console.log("favicon文件处理失败");
    }
}

//修改html对于favicon文件的引用路径
try {
    let platformList = Object.keys(deployContent);
    platformList.map(platform => {
        let pageList = deployContent[platform].length > 0 ? deployContent[platform] : require(`${process.cwd()}/project/${platform}/platformConf.json`)["pageList"];
        pageList.map(page => {
            var fileName = `${process.cwd()}/${projectName}-output/${platform}/${page}/index.html`
            var htmlContent = fs.readFileSync(fileName, 'utf-8');
            var newHtmlContent = htmlContent.replace("favicon.png", "common/favicon.png").replace(/..\/..\/(web|mobile)/g, "../");            
            fs.writeFileSync(fileName, newHtmlContent);
        })
    })
    console.log("修改静态资源引用路径修改成功")    
} catch(e) {
    console.log("修改静态资源引用路径修改失败")
}

// //复制tradingView
try {
    cmd.execSync(`cp -r ${path.resolve(__dirname, process.cwd() + '/common/assets/js/vendor/charting_library')} ${path.resolve(__dirname, process.cwd() + '/' + projectName + '-output/common/')}`)    
    console.log("复制tradingView成功");
} catch(e) {
    console.log("复制tradingView失败");    
}
