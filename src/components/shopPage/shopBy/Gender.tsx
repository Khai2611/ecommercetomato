import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import NavTitle from './NavTitle';
import {db} from '@/firebase/firebaseConfig';
import {collection, getDocs} from 'firebase/firestore';

interface Item {
    _id: string;
    title: string;
    icons?: boolean;
}

interface CategoryProps {
    icons?: boolean;
    setSelectedGender: (gender: string) => void;
}

const Gender: React.FC<CategoryProps> = ({icons, setSelectedGender}) => {
    const [showItems] = useState<boolean>(true);
    const [selectedItem, setSelectedItem] = useState<string | null>(null); // Track selected item
    const [gender, setGender] = useState<Item[]>([]);
    // const items: Item[] = [
    //     {_id: 890, title: 'Men', icons: true},
    //     {_id: 891, title: 'Women'},
    //     {_id: 892, title: 'Kids', icons: true},
    // ];

    useEffect(() => {
        // Fetch genders from Firestore when component mounts
        const fetchGender = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Gender'));
                const genderList: Item[] = [];
                querySnapshot.forEach((doc) => {
                    genderList.push({
                        _id: doc.id, // Firestore document ID is used as _id
                        title: doc.data().gender, // Assuming 'category' is the attribute in Firestore
                    });
                });
                setGender(genderList);
            } catch (error) {
                console.error('Error fetching genders: ', error);
            }
        };

        fetchGender();
    }, []);

    const handleClick = (id: string) => {
        setSelectedItem(id); // Update selected item on click
        setSelectedGender(id); // Pass the selected gender to parent
    };

    return (
        <div>
            <div className='cursor-pointer' style={{marginTop: '70px'}}>
                <NavTitle title='Shop by Gender' icons={false} />
            </div>
            {showItems && (
                <motion.div
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
                        {gender.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => handleClick(item._id)}
                                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 duration-300 cursor-pointer
                  ${
                      selectedItem === item._id
                          ? 'text-tomato border-tomato scale-95'
                          : 'hover:text-tomato hover:border-tomato'
                  }
                `}
                                style={{
                                    transform:
                                        selectedItem === item._id
                                            ? 'scale(0.95)'
                                            : 'scale(1)',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Gender;
