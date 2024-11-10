import p1 from '../../assets/frontend_assets/p1.jpg';

function ProductList() {
    const products = [
        {
            id: 1,
            name: 'Product 1',
            category: 'Category 1',
            price: 'RM230',
            image: p1,
            quantity: 12,
        },
        {
            id: 2,
            name: 'Product 2',
            category: 'Category 2',
            price: 'RM150',
            image: p1, // Replace with the correct image
            quantity: 8,
        },
        // Add more products as needed
        {
            id: 2,
            name: 'Product 2',
            category: 'Category 2',
            price: 'RM150',
            image: p1, // Replace with the correct image
            quantity: 8,
        },
        {
            id: 2,
            name: 'Product 2',
            category: 'Category 2',
            price: 'RM150',
            image: p1, // Replace with the correct image
            quantity: 8,
        },
        {
            id: 2,
            name: 'Product 2',
            category: 'Category 2',
            price: 'RM150',
            image: p1, // Replace with the correct image
            quantity: 8,
        },
    ];

    return (
        <div className='space-y-4 p-4 divide-y divide-gray-300 max-w-xl'>
            <h2 className='text-lg font-bold mb-4'>Order Summary</h2>
            <div className='max-h-[350px] overflow-y-auto'>
                {products.map((product) => (
                    <div key={product.id} className='flex items-center p-4'>
                        <img
                            src={p1}
                            alt='Product'
                            className='w-24 h-24 object-cover mr-4'
                        />

                        <div className='flex-grow text-left'>
                            <h2 className='text-lg font-semibold'>
                                {product.name}
                            </h2>
                            <p className='text-gray-500'>
                                Var: {product.category}
                            </p>
                            <p className='text-gray-500'>
                                Quantity: {product.quantity}
                            </p>
                        </div>
                        <div className='text-center'>
                            <p className='text-lg font-semibold'>
                                {product.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='p-4 '>
                <div className='flex  justify-between '>
                    <p className='font-semibold'>Subtotal</p>
                    <p>RM5000</p>
                </div>
                <div className='flex pt-4 justify-between'>
                    <p className='font-semibold'>Shipping</p>
                    <p>RM15</p>
                </div>
            </div>

            <div className='flex p-4 justify-between'>
                <p className='font-semibold'>Total</p>
                <p className=''>RM5015</p>
            </div>
        </div>
    );
}

export default ProductList;
