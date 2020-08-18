import {Config} from "./types";

const config: Config = {
    INTERIORS_HOST: process.env.REACT_APP_INTERIORS_HOST,
    PIM_HOST: process.env.REACT_APP_PIM_HOST,
    STATIC_HOST: process.env.REACT_APP_STATIC_HOST,
    APP_STORE_LINK: process.env.REACT_APP_APP_STORE_LINK,
    TOKEN: process.env.REACT_APP_TOKEN,

};

export {config};
