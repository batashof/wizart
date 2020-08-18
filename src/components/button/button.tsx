import React from "react"
import '../../styles/styles.scss'


interface Props {
    readonly children?: any;
    readonly size?: any;
    readonly color?: any;
    readonly onClick?: any;
    readonly href?: any;
    readonly style?: any;
    readonly className?: any;
}

const Button: React.FC<Props> = (props) => {
    let className = `button ${props.color} ${props.size} ${props.className}`;
    return (
        <a href={props.href}>
            <button style={props.style} className={className} onClick={props.onClick}>
                {props.children}
            </button>
        </a>
    )

};

export default Button;