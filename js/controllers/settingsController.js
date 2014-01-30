/**
 * User: ramon
 * Date: 1/29/14 11:42 AM
 */
App.SettingsController = Ember.Controller.extend({

  actions: {
    save: function() {
      var me = this;
      var s3credential = me.get('s3credential');
      persistence.save('s3credential', s3credential);
      me.copyS3credential();
    },

    cancel: function() {
      var me = this;
      var s3credentialCopy = me.get('s3credentialCopy');
      me.set('s3credential', $.extend({}, s3credentialCopy));
    }
  },

  init: function() {
    var me = this;
    var s3credential = persistence.load('s3credential', {
      secretAccessKey: '',
      accessKeyId: '',
      region: 'us-east-1'
    });
    me.set('s3credential', s3credential);
    me.copyS3credential();
  },

  copyS3credential: function() {
    var me = this;
    me.set('s3credentialCopy', $.extend({}, me.get('s3credential')));
  }
});