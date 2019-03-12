import * as React from 'react';
import Button from '../Shared/Button';
import Login from './Login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin
                            professor at Hampden-Sydney College in Virginia,
                            looked up one of the more obscure Latin words,
                            consectetur
                        </p>
                        <Button
                            addStyles={{ margin: '10px 0 0 0' }}
                            linkTo="/register"
                            title="Create an account"
                            type="default"
                        />
                    </div>
                    <div className="right">
                        <h2>Registered Customers</h2>
                        <p>If you have an account, please log in</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;
