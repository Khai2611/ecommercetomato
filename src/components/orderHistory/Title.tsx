interface TitleProps {
    orderId: string;
    orderDate: string;
}

function Title({orderId, orderDate}: TitleProps) {
    return (
        <div className='flex justify-between items-center w-full text-gray-600'>
            <div className='justify-items-start'>
                <div>Order ID: {orderId}</div>
                <div>Order Date: {orderDate}</div>
            </div>
            <span className=' mr-4 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                Success
            </span>
        </div>
    );
}

export default Title;
