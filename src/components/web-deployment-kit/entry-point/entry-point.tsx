import React, {useEffect} from "react";
import FittingRoom from '../core/FittingRoom';
// import Analytics from '../core/analytics';
// import {eventNames, actionNames} from '../core/analytics/events';
import {parseJSON} from '../core/utils';
import '../core/styles/glitter.css';
import '../core/styles/tooltip.css';
import '../core/styles/iframe.css';
import './entry-point.scss';

interface Props {
    readonly children?: any,
    readonly parameters?: string,
    readonly apiToken?: string,
    readonly vendorCode?: string,
    readonly articleQuery?: string,
    readonly title?: string,
    readonly tooltipPosition?: string,
    readonly tooltipTitle?: string,
    readonly tooltipDisable?: boolean,
    readonly glitterDisable?: boolean,
    readonly background?: string,
    readonly height?: string,
    readonly width?: string,
    readonly borderRadius?: string,
    readonly border?: string,
    readonly className?: string,
    readonly fontSize?: string,
}

//@ts-ignore

const EntryPoint: React.FC<Props> = ({
                                         children, parameters, apiToken, vendorCode, articleQuery, title = 'Try it in your room in one click!',
                                         tooltipPosition = "top", tooltipTitle = 'See it in your room!', tooltipDisable, glitterDisable, background,
                                         height, width, borderRadius, border, className, fontSize
                                     }) => {

    useEffect(() => {

    });


    const currentParameters = parameters ? parseJSON(parameters) : null;

    if (!apiToken || apiToken === 'token') {
        // eslint-disable-next-line no-console
        console.error('No token!');
        return;
    }

    // const analytics = new Analytics(apiToken, eventNames.entryPoint);
    //
    // const analyticsOptions = {
    //     cd3: (!!vendorCode || !!articleQuery) ? 'yes' : 'no',
    //     cd4: vendorCode || articleQuery,
    // };

    // Отображение кнопки
    // analytics.logEvent(eventNames.entryPoint, actionNames.shown, analyticsOptions);

    const fittingRoom = new FittingRoom(
        apiToken,
        vendorCode,
        articleQuery,
        currentParameters,
    );

    const onclickButton = () => {
        // analytics.logEvent(eventNames.entryPoint, actionNames.pressed, analyticsOptions);
        return fittingRoom.onClick();
    };

    // bba event - fired when back button is clicked at wizart component
    window.addEventListener('message', (event) => fittingRoom.onBackClick(event));


    return (
        <div onClick={onclickButton} style={{
            width: width,
            height: height,
            background: background,
            borderRadius: borderRadius,
            border: border,
            fontSize: fontSize
        }}
             className={`${glitterDisable ? '' : 'w-glitter'} ${tooltipDisable ? '' : 'w-tooltip w-entry-point-tooltip'} w-entry-point ${className || ''}`}
        >
            {children || <div style={{display: "flex", alignItems: "center", width: 21}}>
                <svg width="25" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M23.188 8.75H10.605c-.515.103-.825.516-.825 1.031v1.031c0 .62-.412 1.032-1.031 1.032s-1.031-.413-1.031-1.031V9.78c0-.515-.413-.928-.825-1.031H6.48c-.515.103-.825.516-.825 1.031v3.094c0 .619-.412 1.031-1.031 1.031s-1.031-.412-1.031-1.031v-8.25A4.137 4.137 0 017.719.5h15.468a4.137 4.137 0 014.125 4.125 4.137 4.137 0 01-4.125 4.125zM.5 4.625c0 .619.412 1.031 1.031 1.031h1.032V3.594H1.53C.913 3.594.5 4.006.5 4.625zm27.844-1.031h1.031A4.137 4.137 0 0133.5 7.719V8.75a4.137 4.137 0 01-4.125 4.125H19.062A2.069 2.069 0 0017 14.938v5.156c1.134 0 2.063.928 2.063 2.062v9.282A2.069 2.069 0 0117 33.5h-2.063a2.069 2.069 0 01-2.062-2.063v-9.28c0-1.135.928-2.063 2.063-2.063v-5.157a4.137 4.137 0 014.124-4.124h10.313a2.069 2.069 0 002.063-2.063V7.719a2.069 2.069 0 00-2.063-2.063h-1.031V3.594z"
                          fill="currentColor"/>
                </svg>
            </div>
            }
            <span className="w-entry-point-title">{title}</span>
            {tooltipDisable ? '' : <span
                className={` w-tooltip__text w-tooltip__text--${tooltipPosition}`}>{tooltipTitle}</span>
            }
        </div>
    )
};

export default EntryPoint;