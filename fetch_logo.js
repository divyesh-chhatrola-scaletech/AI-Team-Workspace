const fs = require('fs');

fetch('https://play.google.com/store/apps/details?id=com.king.candycrushsaga&hl=en_IN')
  .then(res => res.text())
  .then(html => {
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log(match[1]);
    } else {
      console.log('Not found');
    }
  })
  .catch(err => console.error(err));
