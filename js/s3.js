/**
 * User: ramon
 * Date: 1/25/14 6:52 PM
 */

window.s3 = {
  updateConfig: function(props) {
    if (props && props.get) {
      props = props.get('data');  //ember-data record
    }
    AWS.config.update(props || {});
    return this;
  },

  listBuckets: function(callback) {
    var me = this;
    var s3 = new AWS.S3();
    s3.listBuckets({}, callback);
    return this;
  }
};