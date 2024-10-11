export async function scrapeReviews(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'scrapeReviews' },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else if (response && response.reviews) {
              resolve(response.reviews);
            } else {
              reject(new Error('Failed to scrape reviews'));
            }
          }
        );
      } else {
        reject(new Error('No active tab found'));
      }
    });
  });
}

export async function analyzeReviews(reviews: string[]): Promise<{ painPoints: string[], sellingPoints: string[] }> {
  // In a real implementation, this would call the ChatGPT API
  // For this example, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        painPoints: [
          'Some users reported issues with battery life',
          'The product can be noisy during operation',
          'A few customers found the setup process complicated'
        ],
        sellingPoints: [
          'Excellent build quality praised by many users',
          'Great value for money according to most reviews',
          'Customer service was highly rated by several buyers'
        ]
      });
    }, 2000); // Simulate API delay
  });
}