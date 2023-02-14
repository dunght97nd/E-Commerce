import React from 'react';
import { Send } from '@material-ui/icons';

import './Newsletter.scss';

const Newsletter = () => {
    return (
        <div className="newsletter">
            <h1 className="title">Newsletter</h1>
            <div className="desc">Get timely updates from your favorite products.</div>
            <div className="inputContainer">
                <input placeholder="Your email" />
                <button>
                    <Send />
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
