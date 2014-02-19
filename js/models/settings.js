/**
 * User: ramon
 * Date: 2/5/14 8:42 AM
 */

App.Settings = DS.Model.extend({
  secretAccessKey: DS.attr('string'),
  accessKeyId: DS.attr('string'),
  region: DS.attr('string')
});