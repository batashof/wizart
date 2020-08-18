import React, {useEffect} from "react";
import FittingRoom from '../core/FittingRoom';
import Analytics from '../core/analytics';
import {eventNames, actionNames} from '../core/analytics/events';
import {parseJSON} from '../core/utils';
import '../core/styles/glitter.css';
import '../core/styles/tooltip.css';
import '../core/styles/iframe.css';
import './floating-button.scss';

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
    readonly compact?: boolean,
}

//@ts-ignore

const FloatingButton: React.FC<Props> = ({
                                             children, parameters, apiToken, vendorCode = 21, articleQuery, title = 'Try it in your room in one click!',
                                             tooltipPosition = "top", tooltipTitle = 'See it in your room!', tooltipDisable, glitterDisable, background,
                                             height, width, borderRadius, border, className, fontSize, compact
                                         }) => {

    useEffect(() => {

    });


    const currentParameters = parameters ? parseJSON(parameters) : null;

    if (!apiToken || apiToken === 'token') {
        // eslint-disable-next-line no-console
        console.error('No token!');
        return;
    }

    const analytics = new Analytics(apiToken, eventNames.floatingButton);

    const analyticsOptions = {
        cd3: (!!vendorCode || !!articleQuery) ? 'yes' : 'no',
        cd4: vendorCode || articleQuery,
    };

    // Отображение кнопки
    analytics.logEvent(eventNames.floatingButton, actionNames.shown, analyticsOptions);

    const fittingRoom = new FittingRoom(
        apiToken,
        vendorCode,
        articleQuery,
        currentParameters,
    );

    const onclickButton = () => {
        analytics.logEvent(eventNames.floatingButton, actionNames.pressed, analyticsOptions);
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
             className={`${glitterDisable ? '' : 'w-glitter'} ${tooltipDisable ? '' : 'w-tooltip w-entry-point-tooltip'} w-floating-button ${compact ? 'w-floating-button--compact' : ''} ${className || ''}`}
        >

            {tooltipDisable || compact ? '' : <span
                className={`w-tooltip__text w-tooltip__text--${tooltipPosition}`}>{tooltipTitle}</span>
            }
            <div className="floating-button__inner">
                <div className="floating-button__icon-wrapper" >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M21 17a1.001 1.001 0 010-2 1.001 1.001 0 010 2zm-9 0h-1.545c-.139 0-.455-.378-.455-1s.316-1 .455-1h7.716c-.03.086-.047.178-.07.267-.014.057-.033.111-.044.17-.035.182-.057.37-.057.563 0 .193.022.381.057.563.011.059.03.113.044.17.023.089.04.181.07.267H12zM23 0H13v13h-2V0H1a1 1 0 00-1 1v22a1 1 0 001 1h11a1 1 0 001-1v-4h8c1.654 0 3-1.346 3-3V1a1 1 0 00-1-1z"
                              fill="currentColor"/>
                    </svg>
                </div>
                <span
                    className={`floating-button__title ${compact ? 'floating-button__title--compact' : 'floating-button__title--full'}`}>{title}</span>
            </div>

        </div>
    )
};

export default FloatingButton;