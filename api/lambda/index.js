const AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var params = {
    TableName: 'CUSTOMER_LIST',
    Item: {
      'CUSTOMER_ID' : {N: '001'},
      'CUSTOMER_NAME' : {S: 'Richard Roe'}
    }
  };
  
exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const guid = body.guid;
    
    const method = event.requestContext.http.method;
    const path = event["routeKey"]
    console.log("hi from lambda")
    switch(path){
        case "GET /product":
          // code block
          break;
        case "GET /products":
          // code block
          break;
        default:
          // code block
      }
    return event;
};