import {useState, useCallback, useEffect, useRef} from 'react';
import {useCarousel} from './use-carousel';
import {useUIStore} from './ui.store';
import {cm} from '../../utils/class-merger';
import {assets} from '../../assets/frontend_assets/assets';
import {ToolTip} from './tooltip';
import {Button} from '../ui/Button2';
import {CloseIcon, ChevronLeftIcon, ChevronRightIcon} from '../ui/Icons';
import React from 'react';

// Accept p1, p2, p3, p4 as props for the images
interface ProductCarousellProps {
    inLightbox?: boolean;
    p1: keyof typeof assets;
    p2: keyof typeof assets;
    p3: keyof typeof assets;
    p4: keyof typeof assets;
}

export const ProductCarousell: React.FC<ProductCarousellProps> = ({
    inLightbox = false,
    p1,
    p2,
    p3,
    p4,
}) => {
    const mainCarouselRef = useRef<HTMLDivElement>(null);
    const [curImageIdx, setCurImageIdx] = useState(0);

    const setLightboxStatus = useUIStore((s) => s.setLightboxStatus);
    const {
        carouselRef,
        carouselImagesRef,
        closeButtonRef,
        prevBtnRef,
        nextBtnRef,
    } = useCarousel(inLightbox);

    // Full images for carousel
    const fullImgs = [p1, p2, p3, p4];
    // Thumbnails for carousel
    const thumbImgs = [p1, p2, p3, p4];

    // const fullImgs = [
    //     assets.shoe4b,
    //     assets.shoe4c,
    //     assets.shoe4d,
    //     assets.shoe4e,
    // ];
    // const thumbImgs = [
    //     assets.shoe4b,
    //     assets.shoe4c,
    //     assets.shoe4d,
    //     assets.shoe4e,
    // ];

    const displayPrevImage = useCallback(() => {
        setCurImageIdx((prevIdx) =>
            prevIdx === 0 ? fullImgs.length - 1 : prevIdx - 1,
        );
    }, []);

    const displayNextImage = useCallback(() => {
        setCurImageIdx((prevIdx) =>
            prevIdx === fullImgs.length - 1 ? 0 : prevIdx + 1,
        );
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && !e.altKey) {
                if (nextBtnRef.current && prevBtnRef.current) {
                    nextBtnRef.current.blur();
                    prevBtnRef.current.focus();
                }
                if (inLightbox) return;
                displayPrevImage();
            }

            if (e.key === 'ArrowRight' && !e.altKey) {
                if (nextBtnRef.current && prevBtnRef.current) {
                    prevBtnRef.current.blur();
                    nextBtnRef.current.focus();
                }
                if (inLightbox) return;
                displayNextImage();
            }
        };

        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [
        displayNextImage,
        displayPrevImage,
        inLightbox,
        nextBtnRef,
        prevBtnRef,
    ]);

    useEffect(() => {
        if (mainCarouselRef.current && inLightbox) {
            mainCarouselRef.current.focus();
            mainCarouselRef.current.style.outline = 'none';
        }
    }, [inLightbox]);

    return (
        <>
            <div ref={carouselRef} className='lg:max-w-3xl'>
                {inLightbox && (
                    <Button
                        ref={closeButtonRef}
                        onClick={() => setLightboxStatus(false)}
                        className={cm([
                            'group p-1 rounded -translate-y-3',
                            'focus-visible:outline-offset-4 focus-visible:outline-Light_grayish_blue',
                        ])}
                    >
                        <ToolTip
                            tip={'Close lightbox or press Esc key'}
                            className='place-self-start after:-top-4'
                            renderOnHover
                        >
                            <CloseIcon className='group-hover:fill-Orange fill-white' />
                        </ToolTip>
                    </Button>
                )}

                {/* FULL IMAGE */}
                <div
                    ref={mainCarouselRef}
                    tabIndex={0}
                    className={cm([
                        'relative outline-none group rounded-3xl',
                        'lg:focus-visible:outline-Orange lg:focus-visible:outline-1',
                    ])}
                >
                    <figure className='relative flex items-center overflow-hidden lg:rounded-3xl'>
                        {fullImgs.map((image, idx) => (
                            <img
                                src={assets[image]}
                                key={`slide_${idx}`}
                                alt='sneakers image'
                                className='transition-transform duration-500 ease-in-out'
                                style={{
                                    transform: `translateX(-${
                                        curImageIdx * 100
                                    }%)`,
                                }}
                                width={1000}
                                height={1000}
                            />
                        ))}
                        <figcaption className='sr-only'>
                            showcasing the sneaker images
                        </figcaption>
                    </figure>

                    {/* ARROWS */}
                    <div>
                        <ToolTip
                            tip={'previous image'}
                            className={cm([
                                'after:-top-12 after:duration-400',
                                'absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2',
                            ])}
                            renderTime={1000}
                            renderCenter
                            renderOnHover
                        >
                            <Button
                                ref={prevBtnRef}
                                variant={'carousel'}
                                onClick={displayPrevImage}
                                className={cm([
                                    'group/prev-btn lg:hidden',
                                    'absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2',
                                    'group-hover:block group-focus-within:block',
                                    inLightbox && 'lg:block -translate-x-1/2',
                                ])}
                            >
                                <ChevronLeftIcon className='group-hover/prev-btn:fill-Orange' />
                            </Button>
                        </ToolTip>

                        <ToolTip
                            tip={'next image'}
                            className={cm([
                                'after:-top-12 after:duration-400',
                                'absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
                            ])}
                            renderTime={1000}
                            renderCenter
                            renderOnHover
                        >
                            <Button
                                ref={nextBtnRef}
                                variant={'carousel'}
                                onClick={displayNextImage}
                                className={cm([
                                    'group/next-btn lg:hidden',
                                    'absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 z-30',
                                    'group-hover:block group-focus-within:block',
                                    inLightbox && 'lg:block translate-x-1/2',
                                ])}
                            >
                                <ChevronRightIcon className='group-hover/next-btn:fill-Orange' />
                            </Button>
                        </ToolTip>
                    </div>

                    {/* SHOWCASE BUTTON */}
                    <div
                        className={cm([
                            'hidden w-full px-4',
                            'lg:flex items-center justify-between',
                            'absolute bottom-4 translate-y-5 opacity-0 transition-all duration-300',
                            'tracking-wider text-Very_light_grayish_blue',
                            'group-hover:translate-y-0 group-hover:opacity-100',
                            'group-focus-within:opacity-100 group-focus-within:translate-y-0',
                            inLightbox && 'lg:hidden',
                        ])}
                    >
                        <p className='p-4 text-xl rounded-md bg-Very_dark_blue/50 ring-1 ring-Very_light_grayish_blue'>
                            Slide with <span>⬅</span> and <span>➡</span>
                        </p>
                    </div>
                </div>

                {/* THUMBNAIL IMAGES */}
                <div className='hidden mt-16 lg:items-center lg:justify-between lg:flex'>
                    {thumbImgs.map((imgThumb, idx) => (
                        <Button
                            ref={(btn) => {
                                if (btn) carouselImagesRef[idx] = btn;
                            }}
                            key={`thumb_${idx}`}
                            aria-current={idx === curImageIdx}
                            onClick={() => setCurImageIdx(idx)}
                            className={cm([
                                'overflow-hidden rounded-2xl border-Orange shadow shadow-Grayish_blue',
                                '[&[aria-current="true"]]:border-2 [&[aria-current="true"]]:after:bg-Pale_orange',
                                'after:absolute after:inset-0 after:opacity-50',
                                'focus-visible:outline-offset-2',
                                inLightbox &&
                                    'shadow-none focus-visible:outline-Light_grayish_blue',
                            ])}
                        >
                            <img
                                src={assets[imgThumb]}
                                alt='sneakers thumbnail image'
                                className='w-40' // Ensure the thumbnail image fills the button container
                                width={176}
                                height={176}
                            />
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
};
