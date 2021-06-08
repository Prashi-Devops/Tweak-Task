var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async(event) => {

    console.log(JSON.stringify(event))
    let tmpPassword = Math.random().toString(36).slice(-10)
    let userName = 'user' + event.body.username
    var params = {
        UserPoolId: process.env.UserpoolId,
        Username: userName,
        TemporaryPassword: tmpPassword
    };

    let userdetails = await getCongnitoUser(params);
    return userdetails;
}

const getCongnitoUser = async(params) => {
    try {
        let responseObj
        let result = await cognitoidentityserviceprovider.adminCreateUser(params).promise().then((data) => {}).catch((err) => { throw err; });
        responseObj = {
            Status: "Success",
            Message: "User is Created successfully"
        }

        return responseObj;
    }
    catch (err) {
        console.log(err);
        let responseObj = {
            Status: "Failure",
            Message: "User is already exists"
        }
        return responseObj

    }
};
