function NavigateToPage(url) {
    // Store the current page's URL in session storage
    sessionStorage.setItem('previousPage', window.location.href);
    // Navigate to the specified URL
    window.location.href = url;
  }

export default NavigateToPage;