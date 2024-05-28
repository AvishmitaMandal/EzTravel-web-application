import React, { useState, useEffect } from 'react';
import { BottomNavigation } from '@mui/material';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <BottomNavigation
                    showLabels
                    style={{
                        width: '100%',
                        position: 'fixed',
                        bottom: 0,
                        backgroundColor: '#2484BF',
                    }}
                >
                    <p style={{ color: 'white' }}>© 2024 EZTravel. All rights reserved.</p>
                </BottomNavigation>
            )}
        </>
    );
};

export default Footer;
