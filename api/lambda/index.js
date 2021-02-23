const AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var params = {
    TableName: PROCESS.ENV.DYNAMO_INVENTORY,
    Item: {
      'GUID' : {N: '001'},
      'CUSTOMER_NAME' : {S: 'Richard Roe'}
    }
  };
  
exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const guid = body.guid;
    const cart = body.cart;

    var params = {
        TableName: PROCESS.ENV.DYNAMO_INVENTORY,
        Item: {
          'GUID' : {N: guid},
          'Cart' : {M: JSON.stringify(cart)}
        }
      };
   
    
    const method = event.requestContext.http.method;
    const path = event["routeKey"]
    switch(path){
        case "GET /product":
        
          break;
        case "GET /products":

        break;
        default:
          // code block
      }
    return event;
};