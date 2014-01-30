/**
 * User: ramon
 * Date: 1/25/14 6:52 PM
 */

window.s3 = {
  init: function(props) {
    AWS.config.update(props);
    return this;
  },

  listBuckets: function(callback) {
    var me = this;
    var s3 = new AWS.S3();
    s3.listBuckets({}, callback);
    return this;
  }
};