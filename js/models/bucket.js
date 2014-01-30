/**
 * User: ramon
 * Date: 1/29/14 11:05 AM
 */
App.Bucket = DS.Model.extend({
  name: DS.attr('string')
});

App.Bucket.FIXTURES = [];
for (var i = 0; i < 10; i++) {
  App.Bucket.FIXTURES.push({
    id: i,
    name: 'Bucket ' + i
  });
}