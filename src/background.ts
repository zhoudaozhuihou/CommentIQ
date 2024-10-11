chrome.runtime.onInstalled.addListener(() => {
  console.log('Amazon Review Analyzer extension installed');
});

// This background script can be used for more complex operations,
// such as handling API calls to ChatGPT or managing data persistence