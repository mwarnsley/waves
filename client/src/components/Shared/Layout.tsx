import * as React from 'react';

import Header from '../Header-Footer/Header';
import Footer from '../Header-Footer/Footer';

interface ILayoutProps {
    children: JSX.Element;
}

class Layout extends React.Component<ILayoutProps, {}> {
    public render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <div className="page_container">{children}</div>
                <Footer />
            </div>
        );
    }
}

export default Layout;
