chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeReviews') {
    const reviews = Array.from(document.querySelectorAll('.review-text-content span'))
      .map(el => el.textContent?.trim())
      .filter(Boolean) as string[];
    
    sendResponse({ reviews });
  }
});