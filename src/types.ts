export interface Wall {
    wall_id: number;
    wallpaper: Article;
    x: number;
    y: number;
}

export interface Surface {
    isActive: boolean;
    appliedArticle?: Article;
}

export interface Floor {
    x: number;
    y: number;
    covering: FloorCovering;
}

export interface FloorCovering {
    uuid?: string;
    width?: number;
    length?: number;
    image_path: string;
}

export interface Room {
    id: string;
    uuid?: string;
    roomTypeId?: number;
    imagePath?: string;
    image_path?: string;
    roomSrc?: string;
    width: number;
    height: number;
    walls: Wall[];
    floor?: Floor;
    room_type_id?: number;
}

export interface Cart {
    article: Article,
    total: number,
    quantity: number
}

export interface Article {
    uuid: string;
    vendor_code: string;
    image_path: string;
    name: string;
    width: number;
    length: number;
    availability: string,
    link: string,
    find_store_action: string,
    add_to_cart_action: string,
    layout: string,
    regular_price: number,
    promotional_price: string,
    rapport: number,
    rapport_unit_uuid: string,
    rapport_shift: number,
    rapport_shift_unit_uuid: string,
    width_unit_uuid: string,
    length_unit_uuid: string,
    main_color_uuid: string,
    texture_uuid: string,
    coating_uuid: string,
    basis_uuid: string,
    waterproofness_uuid: string,
    lightproofness_uuid: string,
    kind_of_removal_uuid: string,
    reverse_180: boolean,
    mural: boolean
    type: ArticleType;
}

export enum Orientation {
    Landscape = 'landscape',
    Portrait = 'portrait',
}

export interface Navigator {
    view: Views | null;
    isLogoVisible: boolean;
    isMenuVisible: boolean;
    isLeftMenuVisible: boolean;
    isRightMenuVisible: boolean;
    isModalWindow: boolean;
    isReturnArrowVisible: boolean;
    isHeaderVisible: boolean;
    isRollerVisible: boolean;
}

export interface Config {
    INTERIORS_HOST?: string;
    PIM_HOST?: string;
    STATIC_HOST?: string;
    APP_STORE_LINK?: string;
    TOKEN?: string;
}


export interface Query {
    vendor_code?: string;
    type?: ArticleType;
    name?: string;
}

export enum ImageSize {
    large = 'large',
    medium = 'medium',
    small = 'small',
}

export enum Views {
    Main = 'Main',
    SelectInterior = 'SelectInterior',
    SelectWallpaperArticles = 'SelectWallpaperArticles',
    SelectFloorArticles = 'SelectFloorArticles',
    ArticlesInfo = 'ArticlesInfo',
    WallFilters = 'WallFilters',
    FloorFilters = 'FloorFilters',
    WallFavorites = 'WallFavorites',
    FloorFavorites = 'FloorFavorites',
    Download = 'Download',
    ArticlePicker = 'ArticlePicker',
    RoomPicker = 'RoomPicker',
}

export enum RoomTypes {
    MyInteriors = 1,
}

export interface SelectedWall {
    id: number;
    isActive: boolean;
    wallpaper?: Article;
}

export enum ArticleType {
    wall = 'wall',
    floor = 'floor',
}

export interface Analytics {
    name: string;
    app_version?: string;
    source?: string;
    client_identifier?: string;
    user_identifier?: string;
    os_version?: string;
    device_model?: string;
    location?: string;
    timezone?: string;
    time?: string;
    interior_identifier?: string;
    product_identifiers?: string[];
    type?: ArticleType;
}

export interface ArticleInfo {
    uuid: string;
    name: string;
    type: ArticleType;
    image_path: string;
    link: string;
    width: string;
    length: string;
    main_color: VocabularyItem;
    main_color_uuid: string;
    brand: {
        name: string;
        country_uuid: string;
        country: VocabularyItem;
    };
    collection: {
        name: string;
    };
    basis: VocabularyItem;
    color: VocabularyItem;
    coating: VocabularyItem;
    country: VocabularyItem;
    interior: VocabularyItem;
    kind_of_removal: VocabularyItem;
    lightproofness: VocabularyItem;
    style: VocabularyItem;
    texture: VocabularyItem;
    unit: VocabularyItem;
    waterproofness: VocabularyItem;
}

export interface VocabularyItem {
    uuid: string;
    name: string;
}

export interface Vocabulary {
    basis: VocabularyItem[];
    color: VocabularyItem[];
    coating: VocabularyItem[];
    country: VocabularyItem[];
    interior: VocabularyItem[];
    kind_of_removal: VocabularyItem[];
    lightproofness: VocabularyItem[];
    style: VocabularyItem[];
    texture: VocabularyItem[];
    unit: VocabularyItem[];
    waterproofness: VocabularyItem[];
}

export enum DeviceType {
    MOBILE = 'mobile',
    TABLET = 'tablet',
    SMART_TV = 'smarttv',
    CONSOLE = 'console',
    WEARABLE = 'wearable',
    DESKTOP = 'desktop',
}

export interface Device {
    type: DeviceType;
    model: string;
    vendor: string;
    os: {
        name: string;
        version: string;
    };
    browser: {
        name: string;
        version: string;
        major: string;
    };
}

export interface SearchPhrases {
    wall: string;
    floor: string;
}

export interface Localization {
    ROOM_LIST?: {
        TITLE?: string;
        TITLE_MY_INTERIORS?: string;
        TITLE_GENERAL_INTERIORS?: string;
    };
    ARTICLE_LIST?: {
        TITLE?: string;
        FILTER_TITLE?: string;
        NO_RESULTS_MESSAGE?: string;
        BRANDS_TITLE?: string;
    };
    FILTER_PANEL?: {
        NAME?: {
            PLACEHOLDER?: string;
        };
    };
    ARTICLE_INFO_PANEL?: {
        ATTRIBUTES?: {
            TYPE?: string;
            WIDTH?: string;
            LENGTH?: string;
            COUNTRY?: string;
            MAIN_COLOR?: string;
            TEXTURE?: string;
            BASIC?: string;
            COATING?: string;
        };
        MORE_BUTTON_TITLE?: string;
    };
    DOWNLOAD?: {
        TITLE?: string;
        ORIGINAL_TITLE?: string;
        RESULT_TITLE?: string;
    };
    ERROR_MESSAGES?: {
        BAD_UPLOAD_PARAMETERS?: {
            TITLE?: string;
            MESSAGE?: string;
        };
        SERVER_ERROR?: {
            TITLE?: string;
            MESSAGE?: string;
        };
    };
    COMMON?: {
        YES?: string;
        NO?: string;
    };
    PRIVACY_POLICY_TITLE?: string;
    TOOLTIPS?: {
        CATALOG_BUTTON?: string;
        ARTICLE_CATALOG_TAB?: string;
        VIEW_ORIGINAL?: string;
        MY_ROOM?: string;
        VIEW_MODE?: string;
        GALLERY?: string;
        CATALOG_HOME_BUTTON?: string;
        CATALOG_BACK_BUTTON?: string;
        CLOSE?: string;
        DELETE_ROOM?: string;
    };
}

export interface OverlayResult {
    src: string;
    id: string;
}

export interface Favorite {
    ids: string[];
    items: Article[];
}

export interface WizartError {
    status: number;
}

export interface WizartResponse {
    data: Array<any>;
    meta: {
        current_page: string;
    };
}


export enum RoomType {
    MyInterior = 1,
}

export enum StatusCode {
    SERVER_ERROR = 500,
    BAD_REQUEST = 400,
}
