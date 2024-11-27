import React, {useState} from 'react';
import Category from './shopBy/Category';
import Gender from './shopBy/Gender';

const ShopSideNav: React.FC<{
    setSelectedCategory: (category: string) => void;
    setSelectedGender: (gender: string) => void;
}> = ({setSelectedCategory, setSelectedGender}) => {
    // State for selected category and gender
    const [selectedCategoryInternal, setSelectedCategoryInternal] = useState<
        string | null
    >(null);
    const [selectedGenderInternal, setSelectedGenderInternal] = useState<
        string | null
    >(null);

    const handleCategoryChange = (category: string) => {
        setSelectedCategoryInternal(category);
        setSelectedCategory(category); // Pass up to Shop
    };

    const handleGenderChange = (gender: string) => {
        setSelectedGenderInternal(gender);
        setSelectedGender(gender); // Pass up to Shop
    };

    return (
        <div className='w-full flex flex-col'>
            <Category setSelectedCategory={handleCategoryChange} icons={true} />
            <Gender setSelectedGender={handleGenderChange} icons={true} />
        </div>
    );
};

export default ShopSideNav;
