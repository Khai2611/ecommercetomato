import React, {useEffect, useState} from 'react';
import './Navbar.css';
import {assets} from '../../../assets/frontend_assets/assets';
import {Link} from 'react-router-dom';
import Example from '../../cart/Slide';

// Remove the props interface since we're omitting setShowLogin
const Navbar: React.FC = () => {
    const [menu, setMenu] = useState<string>('home');

    // for sticky navbar
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // cart
    const [isVisible, setVisible] = useState<boolean>(false);
    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default link behavior
        setVisible(!isVisible);
    };

    return (
        <div>
            <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <Link to='/'>
                    <img src={assets.logo} alt='' className='logo' />
                </Link>
                <ul className='navbar-menu'>
                    <Link
                        to='/'
                        onClick={() => setMenu('home')}
                        className={menu === 'home' ? 'active' : ''}
                    >
                        home
                    </Link>

                    {/* search products */}
                    <a
                        href='/shop'
                        onClick={() => setMenu('shop')}
                        className={menu === 'shop' ? 'active' : ''}
                    >
                        shop
                    </a>
                    {/* <a
            href="/shop"
            onClick={() => {
              setMenu("men");
            }}
            className={menu === "men" ? "active" : ""}
          >
            men
          </a>
          <a
            href="/shop"
            onClick={() => setMenu("women")}
            className={menu === "women" ? "active" : ""}
          >
            women
          </a> */}

                    <a
                        href='#footer'
                        onClick={() => setMenu('contact-us')}
                        className={menu === 'contact-us' ? 'active' : ''}
                    >
                        contact us
                    </a>
                </ul>
                <div className='navbar-right'>
                    <img src={assets.search_icon} alt='' />

                    <div className='navbar-search-icon'>
                        <Link to='#' onClick={handleCartClick}>
                            <img src={assets.basket_icon} alt='' />
                        </Link>
                    </div>
                    {/* <button onClick={() => alert("Sign in function not implemented")}> */}
                    {/* sign in */}
                    {/* </button> */}
                    <div className='navbar-profile'>
                        <a href='/profile'>
                            <img
                                className='profile-icon'
                                src={assets.profile_icon}
                                alt='Profile Icon'
                            />
                        </a>
                    </div>
                </div>
            </div>
            {/* Slide-in Cart - Example Component */}
            <Example open={isVisible} setOpen={setVisible} />
        </div>
    );
};

export default Navbar;
