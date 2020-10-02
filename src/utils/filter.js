export const filterLink = (url) => {
    let baseUrl = url;
    if (url) {
        baseUrl = url.split('/')[2];
        baseUrl = baseUrl.split('www.');
        baseUrl = baseUrl.slice(baseUrl.length-1)[0];
    }
    return baseUrl;
  }