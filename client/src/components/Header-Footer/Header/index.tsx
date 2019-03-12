import * as React from 'react';

class Header extends React.Component<{}, {}> {
    public render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">WAVES</div>
                    </div>
                    <div className="right">
                        <div className="top">LINKS</div>
                        <div className="bottom">LINKS</div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
