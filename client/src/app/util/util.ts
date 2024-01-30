export function getCookie(key: any) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split('=');
      if (cookieKey === key) {
        console.log('util | Cookie retrieved');
        return cookieValue;
      }
    }
    
    console.log('util | Cookie not retrieved');
    return '';
  }