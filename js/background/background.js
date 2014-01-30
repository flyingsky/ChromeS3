/**
 * User: ramon
 * Date: 1/25/14 10:21 AM
 */

//var browser = {
//  // extension
//  getExtensionURL: function(path) {
//    return chrome.extension.getURL(path);
//  },
//
//  getExtensionViews: function(props) {
//    return chrome.extension.getViews(props);
//  },
//
//  // tab
//  createTab: function(props, callback) {
//    chrome.tabs.create(props, callback);
//  },
//
//  updateTab: function(id, props, callback) {
//    chrome.tabs.update(id, props, callback);
//  },
//
//  queryTab: function(queryInfo, callback) {
//    chrome.tabs.query(queryInfo, callback);
//  }
//};

chrome.browserAction.onClicked.addListener(function(tab) {
  var indexUrl = 'index.html';
  var viewTabUrl = browser.getExtensionURL(indexUrl);
  browser.queryTab({
    url: viewTabUrl,
    currentWindow: true
  }, function(tabs) {
    if (tabs.length > 0) {
      var mainTab = tabs[0];
      browser.updateTab(tabs[0].id, {active: true});
    } else {
      browser.createTab({
        url: viewTabUrl
      });
    }
  });
});
