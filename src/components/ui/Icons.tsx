import React from "react";

export const ChevronLeftIcon = ({ className = '' }) => {
	return (
		<svg
			width='30'
			height='30'
			className={className}
			viewBox='0 96 960 960'
			aria-label='navigate left icon'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M560 816 320 576l240-240 56 56-184 184 184 184-56 56Z' />
		</svg>
	);
};

export const ChevronRightIcon = ({ className = '' }) => {
	return (
		<svg
			width='30'
			height='30'
			className={className}
			aria-label='navigate right icon'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 96 960 960'>
			<path d='M348 788q-11-11-11-28t11-28l156-156-156-156q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404 788q-11 11-28 11t-28-11Z' />
		</svg>
	);
};

export const PlusIcon = ({ className = 'w-5 h-5' }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="increase quantity"
        strokeWidth={4}
        stroke="currentColor"
        className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    );
  };
  

  export const MinusIcon = ({ className = 'w-5 h-5' }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-label="decrease quantity"
        viewBox="0 0 24 24"
        strokeWidth={4}
        stroke="currentColor"
        className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
      </svg>
    );
  };
  

  export const CartIcon = ({ className = '' }) => {
    return (
      <svg
        className={`${className}`}
        aria-label='cart icon'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'>
        <path d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z' />
      </svg>
    );
  };
  
  export const CloseIcon = ({ className = '' }) => {
    return (
      <svg
        width='14'
        height='15'
        fill='none'
        className={`${className} fill-Dark_grayish_blue`}
        aria-label='close button icon'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          d='m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z'
        />
      </svg>
    );
  };
  