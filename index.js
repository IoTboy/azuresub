var azure = require('azure');

var namespace = 'iotcloudeventhub';
var accessKey = 'Endpoint=sb://iotcloudeventhub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=M+O/bZzxZPANa1Us5LzRXso5KMVzt/3j4iazUrmGUz4=';

var retryOperations = new azure.ExponentialRetryPolicyFilter();
var serviceBusService = azure.createServiceBusService(accessKey).withFilter(retryOperations);

// setInterval(receivedMessage, 3000);
alertMessage();

function receivedMessage() {
serviceBusService.receiveSubscriptionMessage('sensor', 'temp',
{ timeoutIntervalInS: 2 }, function(error, receivedMessage){
  if(!error){
    // Message received and deleted
    console.log('Message received. Content:');
    console.log(receivedMessage);
  } else {
    console.log(error);
  }
});
}

function alertMessage() {
serviceBusService.receiveSubscriptionMessage('sensor', 'threshold',
{ timeoutIntervalInS: 5 }, function(error, receivedMessage){
  if(!error){
    // Message received and deleted
    console.log('**************************************');
    console.log('Alert Message received. Content:');
    console.log(receivedMessage);
  } else {
    console.log(error);
  }
  alertMessage();
});
}
