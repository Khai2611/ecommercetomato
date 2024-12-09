import React, {useState} from 'react';

import AccountSettings from './AccountSettings';
import OrderHistory from './OrderHistory';

const Content: React.FC = () => {
    const [index, setIndex] = useState<number>(0);
    const tabs: string[] = ['Account Settings', 'Order History'];

    return (
        <main
            className='flex flex-col justify-between pt-5 bg-white rounded-lg border border-gray-200 shadow-xl shadow-Orange/30 lg:w-3/4 w-full h-[505px]' // Change width here
            style={{
                transform: 'translateY(-100px)',
                marginTop: '90px',
                marginBottom: '0px',
            }}
        >
            <div className='border-b border-gray-300 mt-1 flex px-5'>
                {tabs.map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => setIndex(i)}
                        className={`mx-3 px-0 py-3 font-semibold border-b-2
              ${
                  index === i
                      ? 'text-tomato border-tomato'
                      : 'text-gray-500 border-transparent'
              }
            `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className='px-3 mt-10 overflow-auto'>
                {index === 0 ? (
                    <div>
                        <AccountSettings />
                    </div>
                ) : (
                    <div>
                        <OrderHistory />
                    </div>
                )}
            </div>
        </main>
    );
};

export default Content;
