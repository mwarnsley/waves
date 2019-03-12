import * as React from 'react';
import { connect } from 'react-redux';
import FormField from '../Shared/Forms/FormField';

import { update } from '../Shared/Forms/formActions';
import { IAppState } from '../../utils/app-state';

interface ILoginState {
    formError: boolean;
    formSuccess: string;
    formData: object;
}

interface IElement {
    id: string;
    event: any;
    blur: boolean;
}

class Login extends React.Component<{}, ILoginState> {
    public state = {
        formData: {
            email: {
                config: {
                    name: 'email_input',
                    placeholder: 'Enter your email',
                    type: 'email'
                },
                element: 'input',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                valid: false,
                value: ''
            },
            password: {
                config: {
                    name: 'password_input',
                    placeholder: 'Enter your password',
                    type: 'password'
                },
                element: 'input',
                touched: false,
                validation: {
                    password: true,
                    required: true
                },
                valid: false,
                value: ''
            }
        },
        formError: false,
        formSuccess: ''
    };
    public render() {
        const { formData } = this.state;
        return (
            <div className="signin_wrapper">
                <form onSubmit={this.submitForm}>
                    <FormField
                        formData={formData.email}
                        id="email"
                        // tslint:disable-next-line
                        onChange={(element: IElement) =>
                            this.updateForm(element)
                        }
                    />
                    <FormField
                        formData={formData.password}
                        id="password"
                        // tslint:disable-next-line
                        onChange={(element: IElement) =>
                            this.updateForm(element)
                        }
                    />
                </form>
            </div>
        );
    }
    private submitForm = (event: object) => {
        console.log('We are submitting: ');
    };
    private updateForm = (element: IElement) => {
        const { formData } = this.state;
        const newFormData = update(element, formData, 'login');
        this.setState({
            formData: newFormData,
            formError: false
        });
    };
}

const mapStateToProps = (state: IAppState) => ({
    user: state.user
});

export default connect(mapStateToProps)(Login);
