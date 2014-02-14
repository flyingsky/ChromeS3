window.App = Ember.Application.create();

App.errorHandler = function(err) {
  alert((err && err.message) || 'error!');
}

App.SettingsAdapter = DS.LSAdapter.extend({
  namespace: 'chromes3'
});

App.ApplicationAdapter = DS.Adapter.extend({
  find: function() {
    console.log('TODO find');
  },

  createRecord: function() {
    console.log('TODO createRecord');
  },

  updateRecord: function() {
    console.log('TODO updateRecord');
  },

  deleteRecord: function() {
    console.log('TODO deleteRecord');
  },

  findAll: function(store, type, sinceToken) {
    console.log(type);

    var resolver = function(resolve, reject) {
      s3.listBuckets(function(err, data){
        if (err) {
          reject(err);
        } else {
          var buckets = data.Buckets;
          var records = [];
          for (var i = 0, len = buckets.length; i < len; i++) {
            records.push(store.createRecord(type, {name: buckets[i].Name}));
          }
          resolve(records);
        }
      });
    };

    var onFulfilled = function(result) {
      return result;
    };

    var onRejected = function(err) {
      App.errorHandler(err);
    };

    return new Ember.RSVP.Promise(resolver).then(onFulfilled, onRejected);
  },

  findQuery: function() {
    console.log('TODO findQuery');
  },

  findMany: function() {
    console.log('TODO findMany');
  }
});
