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

Ember.Handlebars.helper('objectLink', function(){
  console.log(arguments);
  var args = Array.prototype.slice.call(arguments, 0);
  return args.join('/');
});

Ember.Handlebars.helper('highlight', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Handlebars.SafeString('<span class="highlight">' + escaped + '</span>');
});

