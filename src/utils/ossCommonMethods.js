import vue from '@/main.js';

const OSS = require('ali-oss')
var ossReturnArr = [];
var resultData = {
  ossReturnArr:[],
  code:0,
}
var source = ""
var otherParams ={
  orderId:'',
  jobseekerId:0,
  recruitUnitId:0,
}
//参数一  File数组
//参数二：例如  contracts/thisorderId/
//参数三：例如  /order-management/contract
//1上传文件到oss并将信息提交到数据库
export const submitUpload = function (fileList, filePath,sourcePage2,otherParams2) {
  return new Promise((resolve, reject) => {
    source = sourcePage2;

    otherParams = otherParams2
    console.log('gggggggggggg' , otherParams)
    //export default {
    //点击提交云端
    // async submitUpload(fileList,filePath) {//filePath:文件路径+名字
    console.log('vue', vue)
    // console.log('this.fileList', this.fileList)
    if (fileList.length == 0) {
      vue.$message.error("请先选择文件，再提交到云端");
      return "false";
    }
    //vue.$axios.post("aliyun/sts").then((result) => {
    vue.$axios.post("/aliyunOss/getOssData").then(async (result) => {
      console.log('tttttttt')
      //定义Oss实例
      var client = new OSS({
        accessKeyId: result.data.accessKeyId,
        accessKeySecret: result.data.accessKeySecret,
        region: result.data.region,
        bucket: result.data.bucket,
      });
      console.log('client', client)
      //设置加载进度条
      const loading = vue.$loading({
        lock: true,
        text: '文件上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //上传
      var pros = []
      for (let f of fileList) {

        //设置存储路径
        var it = f.name.split(".");//后缀
        var suffix = it[it.length - 1];
        var storeAs =  filePath + f.uid +"."+ suffix ;//文件路径+名字
        //var storeAs = filePath;//文件名字
        console.log(f.name + ' =>111111111 ' + storeAs);
        //上传
        if (f.size > 5 * 1024 * 1024) {
          mutiUpload(f, client, storeAs, suffix).then(res=>{
            pros.push(res)

            if( pros.length == fileList.length ){
              vue.$message.success("文件上传成功");
              commitDrawing().then(res=>{
                // 提交数据库成功
                console.log('dhdfhfdh')
                console.log('ossReturnArr', ossReturnArr)
                if (ossReturnArr.length == 0){
                  vue.$message.success("提交数据库成功");
                  vue.$message.success("文件上传成功");
                  console.log('提交数据库成功' )
                  loading.close()
                  resultData.code = 200;
                  resolve(resultData)
                }else {
                  vue.$message.error("提交数据库失败");
                  console.log('提交数据库失败' )
                }
              })
            }
          })

        } else {
         commonUpload(f, client, storeAs, suffix).then(res=>{
            pros.push(res)
            if( pros.length == fileList.length ){
              //提交数据库
              commitDrawing().then(res=>{
                // 提交数据库成功
                console.log('dhdfhfdh')
                console.log('ossReturnArr', ossReturnArr)
                if (ossReturnArr.length == 0){
                  vue.$message.success("提交数据库成功");
                  vue.$message.success("文件上传成功");
                  console.log('提交数据库成功' )
                  loading.close()
                  resultData.code = 200;
                  console.log('resasasasssult', resultData)
                  resolve(resultData)
                }else {
                  vue.$message.error("提交数据库失败");
                  console.log('提交数据库失败' )
                }
              })

            }
          })
        }
      }

    });
  })
}


//2上传文件到oss但不将信息提交到数据库
export const uploadNoSubmitMysql = function (fileList, filePath,sourcePage2,otherParams2) {
  return new Promise((resolve, reject) => {
    source = sourcePage2;
    otherParams = otherParams2
    //export default {
    //点击提交云端
    // async submitUpload(fileList,filePath) {//filePath:文件路径+名字
    console.log('fileList', fileList)
    console.log('vue', vue)
    // console.log('this.fileList', this.fileList)
    if (fileList.length == 0) {
      vue.$message.error("请先选择文件，再提交到云端");
      return "false";
    }
    //vue.$axios.post("aliyun/sts").then((result) => {
    vue.$axios.post("aliyun/sts").then(async (result) => {
      console.log('tttttttt')
      //定义Oss实例
      var client = new OSS({
        accessKeyId: result.data.accessKeyId,
        accessKeySecret: result.data.accessKeySecret,
        stsToken: result.data.securityToken,
        region: result.map.region,
        bucket: result.map.bucket,
      });
      console.log('client', client)
      //设置加载进度条
      const loading = vue.$loading({
        lock: true,
        text: '文件上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //上传
      var pros = []
      for (let f of fileList) {

        //设置存储路径
        var it = f.name.split(".");//后缀
        var suffix = it[it.length - 1];
        var storeAs =  filePath + f.uid +"."+ suffix ;//文件路径+名字
        //var storeAs = filePath;//文件名字
        console.log(f.name + ' =>111111111 ' + storeAs);
        //上传
        if (f.size > 5 * 1024 * 1024) {
          mutiUpload(f, client, storeAs, suffix).then(res=>{
            pros.push(res)
            if( pros.length == fileList.length ){
              loading.close()
              resultData.code = 200;
              resultData.ossReturnArr = ossReturnArr;
              ossReturnArr = []
              resolve(resultData)
            }
          })

        } else {
          commonUpload(f, client, storeAs, suffix).then(res=>{
            pros.push(res)
            if( pros.length == fileList.length ){
              loading.close()
              resultData.code = 200;
              console.log('||||||||||||ssReturnArr', ossReturnArr)
              resultData.ossReturnArr = ossReturnArr;
              ossReturnArr = []
              resolve(resultData)
            }
          })
        }
      }

    });
  })
}

//分片
export const mutiUpload = function (f, client, storeAs, suffix) {

  return client.multipartUpload(storeAs, f).then((res) => {
    console.log('multi upload success');	//上传完成;
    var returnUrl = '',//云端存储路径
        returnUrl = `${storeAs}`;
    //把文件的信息封装，放到this.ossReturnArr
    var fileData = {
      fileName: "",
      filePath: "",
      type: "",
      source: "",
    };
    var it = f.name.split(".");
    var n = '';
    for (var j = 0; j < it.length - 1; j++) {
      n = n + it[j];
    }
    fileData.fileName = n;//原名
    fileData.filePath = returnUrl;//路径
    fileData.type = suffix;//后缀
    fileData.source = source
    if (otherParams.used != ''){
      fileData.used = otherParams.used;
    }
    if (otherParams.jobseekerId != 0){
      fileData.jobseekerId = otherParams.jobseekerId;
    }
    if (otherParams.recruitUnitId != 0){
      fileData.recruitUnitId = otherParams.recruitUnitId;
    }
    ossReturnArr.push(fileData);
  })
      .catch((err) => {
        console.log('fail');
        console.log(err);
      });
}


//普通
export const commonUpload = function (f, client, storeAs, suffix) {
  console.log('111111')
  return client.put(storeAs, f).then((res) => {
    console.log('success');	//上传完成;
    var returnUrl = '',//云端存储路径
        returnUrl = `${storeAs}`;
    //把图纸的信息封装，放到this.ossReturnArr
    var fileData = {
      fileName: "",
      filePath: "",
      type: "",
      source: "",
      jobseekerId:0
    };
    var it = f.name.split(".");
    var n = '';
    for (var j = 0; j < it.length - 1; j++) {
      n = n + it[j];
    }
    console.log('zzzzzzzzzzzzzzzz', n)
    console.log('zzzzzzzzzzzzzzzz', returnUrl)
    console.log('zzzzzzzzzzzzzzzz', suffix)

    fileData.fileName = n;//原名
    fileData.filePath = returnUrl;//路径
    fileData.type = suffix;//后缀
    fileData.source = source
    if (otherParams.used != ''){
      fileData.used = otherParams.used;
    }
    console.log('othwwwwwwwwwwwwwwwerParams' , otherParams)
    if (otherParams.jobseekerId != 0){
      fileData.jobseekerId = otherParams.jobseekerId;
    }
    if (otherParams.recruitUnitId != 0){
      fileData.recruitUnitId = otherParams.recruitUnitId;
    }
    console.log("fileData", fileData)
    ossReturnArr.push(fileData);
  }).catch((err) => {
    console.log('fail');
    console.log(err);
  });

}


//文件信息提交数据库
export const commitDrawing = function () {

  console.log("this.ossReturn" , ossReturnArr);
  if (ossReturnArr.length == 0) {
    vue.$message.error("请先选取文件上传到云端，再保存信息");
    return;
  }
console.log('ossReturnArrzzzzzzzzzzzzzzzzzz' , ossReturnArr)

   return vue.$axios.post("/aliyunOss/addList", ossReturnArr).then((res) => {
     console.log('resdddddddddd' , res)
    if (res.code == 200) {
      vue.$message.success("数据保存成功");
      console.log('44444455555555')
      console.log('res.dat44444a', res)
      resultData.ossReturnArr = res.data;
      console.log('resultData.ossReturnArr', resultData.ossReturnArr)
      ossReturnArr = [];
    } else {
      vue.$message.error("数据保存失败，请联系管理员");
    }
  });


  //清空临时信息
  //this.initUpload();
}


//文件下载
export const fileDownLoad = function (filePathz) {
  console.log('333333' )
  vue.$axios({
    method: "get",
    url: "/aliyun/download?filepath=" + filePathz,
    responseType: "blob",
  }).then((res) => {
    // if(res.type=="application/json"){
    //   this.$message.success("没有信息可以导出，请修改过滤条件")
    //   this.initExcelForm();
    // }else{
    let blob = new Blob([res], {
      type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
    });
    let objectUrl = URL.createObjectURL(blob);
    let link = document.createElement("a");
    let fname = filePathz; //下载文件的名字
    link.href = objectUrl;
    link.setAttribute("download", fname);
    document.body.appendChild(link);
    link.click();
    link.remove();
    //this.initExcelForm();
    // }
  });
}
