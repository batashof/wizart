// todo get api token from Wizart.

import {config} from "../config";

const api_token = config.TOKEN;
const server_address = config.PIM_HOST;

// bba (back button action) param is used to add back button to wizart component
const fittingRoomEndpoint = server_address
    + '/fitting-room'
    + '?api_token=' + api_token
    + '&bba=true'
;

export function openFittingRoom (searchQuery) {
    const componentEndpoint = searchQuery ? fittingRoomEndpoint + searchQuery : fittingRoomEndpoint;

    let fittingRoomObject = document.getElementById('wizart-fitting-room-object');
    const fittingRoomObjectContainer = fittingRoomObject.parentElement;

    fittingRoomObject.setAttribute('src', componentEndpoint);
    // object clonning is necessary as some browsers does not render "object" twice after changing data attribute
    const clonnedFittingRoomObject = fittingRoomObject.cloneNode(true);

    fittingRoomObjectContainer.appendChild(clonnedFittingRoomObject);
    fittingRoomObject.remove();

    clonnedFittingRoomObject.classList.add('active');

    // should be added to avoid duplicating scrollbars
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
}

export function openSpecificFittingRoom (vendorCode) {
    // query can be updated to search for necessary article
    const articleSearchQuery = '&article_query='
        + '{"vendor_code": "'
        + vendorCode
        + '"}'
    ;

    openFittingRoom(articleSearchQuery);
}

// bba event - fired when back button is clicked at wizart component
window.addEventListener('message', function (event) {
    if (~event.origin.indexOf(server_address)) {
        // exactly 'close_overlay' as it's sent from wizart component
        if (event.data === 'close_overlay') {
            // return overflow of target page to initial state
            document.getElementsByTagName('html')[0].style.overflow = 'auto';

            document.getElementById('wizart-fitting-room-object').classList.remove('active');
        }
    }
});