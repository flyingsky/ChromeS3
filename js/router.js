/**
 * User: ramon
 * Date: 1/29/14 7:44 AM
 */

App.Router.map(function() {
  this.resource('buckets', {path: '/'});
  this.route('settings', {path: '/settings'});
  this.route('about', {path: '/about'});
});

App.BucketsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('bucket');
  }
});
