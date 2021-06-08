console.log('Loading function');
var AWS = require('aws-sdk');
var imagemagicks = require("./imagemagic.js")
var s3 = new AWS.S3();
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async(event) => {
  console.log(JSON.stringify(event))
  let base64dec = event.headers.authorization.split(' ')[1];
  var basedecoder = Buffer.from(base64dec, 'base64')
  var authUser = basedecoder.toString();
  authUser = authUser.split(':')[0]
  let result = await isUserAuthorized(authUser);
  console.log("result", result);
  if (result) {
    let encodedImage = JSON.parse(event.body).url;
    console.log("encode::",encodedImage)
    let decodedImage = Buffer.from(encodedImage, 'base64');
    console.log("decde::",decodedImage)
    //store the image in s3
    var filePath = "avatars/" + event.queryStringParameters.username + ".png"
    console.log(JSON.stringify(event))
    var params = {
      "Body": decodedImage,
      "Bucket": process.env.bucketName,
      "Key": filePath,
      "ContentType ": "mime/png"
    };
    console.log(params)
    let uploaddataTos3 = await s3putobjects(params);
    
    let imagemeta = imagemagicks(encodedImage);
    console.log("imagemagic::",imagemeta)
    // export the metadata to s3
    let metadatapath = "avatars/" + event.queryStringParameters.username + "-metadata.json";
    let s3params = {
      "Body": imagemeta,
      "Bucket": process.env.bucketName,
      "Key": metadatapath,
      "ContentType ": "mime/png"
    };
    console.log(s3params)
    let exportTos3 = await s3putobjects(s3params);
    return uploaddataTos3;  
  }
  else {
    let resobj = {
      Status: "Failure",
      Message: "User not Authorized to upload the object"
    }
    return resobj
  }
};


const s3putobjects = async(params) => {
  let result = await s3.upload(params).promise().then((data) => { console.log("Coming inside", data) }).catch((err) => console.log("errror in put object : ", err))
  return result = {
    "Status": "Success",
    "Message": "Data uploaded to s3 Successfully"
  };
}

const getCongnitoUser = async(params) => {
  let userse = [];
  let result = await cognitoidentityserviceprovider.listUsers(params).promise().then((data) => {
    data.Users.forEach((item) => {
      userse.push(item.Username)
      console.log(userse)
    })
  });
  return userse;
};

const userValidation = async(userPoolId) => {
  var params = {
    UserPoolId: userPoolId,
    Limit: '10'
  };
  let getCongnito = await getCongnitoUser(params);
  return getCongnito;
};

const isUserAuthorized = async(authUser) => {
  let userPoolId = process.env.UserpoolId;
  let users = await userValidation(userPoolId);
  if (users.includes(authUser)) {
    return true;
  }
  return false;
}

