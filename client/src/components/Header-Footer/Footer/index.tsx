import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import * as faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import * as faClock from '@fortawesome/fontawesome-free-solid/faClock';
import * as faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">Waves</div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact Information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faCompass}
                                />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Kramer 1234</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faPhone}
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>555-555-5555</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faClock}
                                />
                                <div className="nfo">
                                    <div>Working Hours</div>
                                    <div>Mon-Sun/ 9am-8px</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faClock}
                                />
                                <div className="nfo">
                                    <div>Working Hours</div>
                                    <div>Mon-Sun/ 9am-8pm</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faEnvelope}
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>nfo@waves.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            Get all of the latest information on events, sales,
                            and offers. You don't want to miss out
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
