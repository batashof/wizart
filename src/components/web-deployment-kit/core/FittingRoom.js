
import {config} from '../../../config';

class FittingRoom {
  constructor(apiToken, vendorCode, articleQuery, currentParameters) {
    this.iframe = null;
    this.apiToken = apiToken;
    this.vendorCode = vendorCode;
    this.articleQuery = articleQuery;
    this.currentParameters = currentParameters;
  }

  /**
  * Returns the url to the web-visualizer with parameters
  * @param {String} apiToken
  * @param {String} vendorCode
  * @param {String} articleQuery
  * @param {Object} parameters
  * @returns {String}
  */
  getEndPoint() {
    let currentArticleQuery = this.articleQuery
      ? `&article_query=${this.articleQuery}`
      : (this.vendorCode ? `&article_query=${JSON.stringify({ vendor_code: this.vendorCode })}` : '');

    Object.keys(this.parameters || {}).forEach((key) => {
      currentArticleQuery += this.parameters[key] ? `&${key}=${this.parameters[key]}` : '';
    });

    return `${config.PIM_HOST}/fitting-room?api_token=${this.apiToken}&bba=true${currentArticleQuery}`;
  }

  onClick() {
    this.iframe = document.createElement('iframe');

    this.iframe.id = 'wizart-fitting-room-object';
    this.iframe.allowFullscreen = 'true';
    this.iframe.className = 'w-iframe';
    console.log(this.getEndPoint())

    const fittingRoomEndpoint = this.getEndPoint();

    this.iframe.setAttribute('src', fittingRoomEndpoint);
    document.body.appendChild(this.iframe);

    // should be added to avoid duplicating scrollbars
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  onBackClick(event) {
    if (~event.origin.indexOf(config.PIM_HOST) && this.iframe) {
      // exactly 'close_overlay' as it's sent from wizart component
      if (event.data === 'close_overlay') {
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        this.iframe.remove();
      }
    }
  }
}

export default FittingRoom;
