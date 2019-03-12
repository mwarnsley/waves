import * as React from 'react';
import { Link } from 'react-router-dom';

// Declaring the interface type props for the button
interface IButtonProps {
    addStyles: object;
    linkTo: string;
    title: string;
    type: string;
}

const Button: React.FunctionComponent<IButtonProps> = (props): JSX.Element => {
    const buttons = (): any => {
        let template;

        switch (props.type) {
            case 'default':
                template = (
                    <Link
                        className="link_default"
                        to={props.linkTo}
                        {...props.addStyles}
                    >
                        {props.title}
                    </Link>
                );
                break;
            default:
                template = '';
        }

        return template;
    };
    return <div className="my_link">{buttons()}</div>;
};

export default Button;
