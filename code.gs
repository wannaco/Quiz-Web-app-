function doGet() {
  
      
  
   var doc = SpreadsheetApp.openById('1MYjVNUJ0rDmaWYm4IFyEyrcqHLPycnLFat2S1QkIyLQ');
   
    var res = doc.getSheetByName("Results");
    var row = res.getLastRow();
    var col = res.getLastColumn();
    var r=1;
    var taken = "No";
    for(i=1; i <= row; i++){ 
      if(res.getRange(r,col,1,1).getValue() == Session.getEffectiveUser() ){
       
      taken = "Yes";
      Logger.log(res.getRange(r,col,1,1).getValue());
      }
        r++;
      }
  
    
    if(taken == "Yes"){
      return HtmlService
      .createTemplateFromFile('quiztaken')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    
    } else {
    
    var html =  HtmlService
      .createTemplateFromFile('Index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
      var page = html.addMetaTag('viewport', 'width=device-width, initial-scale=1');
      return page;
     
    }

   
}

function getData() {
 return SpreadsheetApp
        .openById('1MYjVNUJ0rDmaWYm4IFyEyrcqHLPycnLFat2S1QkIyLQ')
        .getSheetByName("Sheet1")
        .getDataRange()
        .getValues();
  
}      





//  1. Enter sheet name where data is to be written below
        var SHEET_NAME = "Results";
         
//  2. Run > setup
//
//  3. Publish > Deploy as web app
//    - enter Project Version name and click 'Save New Version'
//    - set security level and enable service (most likely execute as 'me' and access 'anyone, even anonymously)
//
//  4. Copy the 'Current web app URL' and post this in your form/script action
//
//  5. Insert column names on your destination sheet matching the parameter names of the data you are passing in (exactly matching case)
 
//var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
 
// If you don't want to expose either GET or POST methods you can comment out the appropriate function


function doPost(e){
  return handleResponse(e);
}
 
function handleResponse(e) {
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
   
  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById('1MYjVNUJ0rDmaWYm4IFyEyrcqHLPycnLFat2S1QkIyLQ');
    var sheet = doc.getSheetByName(SHEET_NAME);
     
    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers){
      if (headers[i] == "Timestamp"){ // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else { // else use header name to get data
        row.push(e.parameter[headers[i]]);
      }
    }
    
    var htmlobj = JSON.stringify(e.parameters);
    Logger.log(htmlobj);
    var json = JSON.parse(htmlobj);
    
    var htmlmessage = "<h2> Score: "+ json['yo']+ "</h2><br><br><h2>User: "+json['User']+"</h2>";
    Logger.log(htmlmessage);
    var toaddress = Session.getEffectiveUser();
    
   
    
    // more efficient to set values as [][] array than individually
    MailApp.sendEmail({ to: toaddress , subject: "Quiz", htmlBody: htmlmessage});
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return json success results
    return HtmlService
      .createTemplateFromFile('onsuccess')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
          
  } catch(e){
    // if error return this
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
  

 
}
