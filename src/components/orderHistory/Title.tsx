function Title() {
    return (
        <div className='flex justify-between items-center w-full'>
            <div className='justify-items-start'>
                <div>Order ID: abc123</div>
                <div>Order Date: 30 Oct 2024</div>
            </div>
            <span className=' mr-4 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                Success
            </span>
        </div>
    );
}

export default Title;
