/**
 * User: ramon
 * Date: 1/29/14 7:44 AM
 */

App.Router.map(function() {
  this.resource('buckets', {path: '/buckets'}, function() {

  });
  this.resource('bucket', {path: '/buckets/:bucket_name'});
  this.route('settings', {path: '/settings'});
  this.route('about', {path: '/about'});
});

App.S3Route = Ember.Route.extend({
  beforeModel: function() {
    var me = this;
    if (!s3.isConfig) {
      return me.store.find('settings', 's3credential').then(function(result){
        s3.updateConfig(result);
      });
    }
  }
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

App.BucketsRoute = App.S3Route.extend({
  model: function() {
    var buckets = this.store.all('bucket');
    if (buckets.get('length') == 0) {
      buckets = this.store.find('bucket');
    }
    return buckets;
  }
});

App.BucketRoute = App.S3Route.extend({
  model: function(bucketName) {
    // TODO: bucket_name???
    console.log(bucketName.bucket_name);
    return this.store.find('objectWrap', bucketName.bucket_name);
  }
})

App.SettingsRoute = App.S3Route.extend({
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
