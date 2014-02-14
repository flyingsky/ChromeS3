/**
 * User: ramon
 * Date: 1/29/14 7:44 AM
 */

App.Router.map(function() {
  this.route('buckets', {path: '/buckets'});
  this.route('settings', {path: '/settings'});
  this.route('about', {path: '/about'});
});

App.IndexRoute = Ember.Route.extend({
  activate: function() {
    var me = this;
    me.store.find('settings', 's3credential').then(function(result){
      s3.updateConfig(result);
      me.store.find('bucket').then(function(result){
        me.transitionTo('buckets');
      }, function(err){
        me.transitionTo('settings');
      })
    }, function(err){
      me.transitionTo('settings');
    })
  }
});

App.BucketsRoute = Ember.Route.extend({
  model: function() {
    var buckets = this.store.all('bucket');
    if (buckets.get('length') == 0) {
      buckets = this.store.find('bucket');
    }
    return buckets;
  }
});

App.SettingsRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.copyModel(model);
  },

  model: function() {
    var store = this.store;
    return this.store.find('settings', 's3credential').then(function(result){
      return result;
    }, function(err) {
      return store.push('settings', {
        secretAccessKey: '',
        accessKeyId: '',
        region: 'us-east-1',
        id: 's3credential'
      }).save();
    });
  }
});
