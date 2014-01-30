/**
 * User: ramon
 * Date: 1/29/14 4:12 PM
 */
Handlebars.registerHelper('loopObject', function(obj){
  var result = [];
  for(var key in obj) {
    result.push({
      key: key,
      value: obj[key]
    });
  }
  return JSON.stringify(result);
});