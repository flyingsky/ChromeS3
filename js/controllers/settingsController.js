/**
 * User: ramon
 * Date: 1/29/14 11:42 AM
 */
App.SettingsController = Ember.ObjectController.extend({

  actions: {
    save: function() {
      var me = this;
      var model = me.get('model');
      model.save();
      s3.updateConfig(model);
    },

    cancel: function() {
      var me = this;
      me.get('model').rollback();
    }
  },

  copyModel: function(model) {
    var me = this;
    me.clonedModel = Em.copy(model.get('data'));
  }
});