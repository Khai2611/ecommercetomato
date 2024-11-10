import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import ProductList from './ProductList';
import p1 from '../../assets/frontend_assets/p1.jpg';
import Title from './Title';

function Dropdown() {
    const products = [
        {
            id: 1,
            name: 'Product 1 adsadas sadasdasd sadsadwa sdasdwad',
            category: 'Category 1',
            price: 'RM230',
            image: p1,
            quantity: 12,
            orderId: 'abc123',
            date: 'Oct 20, 2024',
        },
        {
            id: 2,
            name: 'Product 2',
            category: 'Category 2',
            price: 'RM150',
            image: p1, // Replace with the correct image
            quantity: 8,
            orderId: 'abc123',
            date: 'Oct 20, 2024',
        },
        {
            id: 3,
            name: 'Product 3',
            category: 'Category 3',
            price: 'RM150',
            image: p1, // Replace with the correct image
            quantity: 82,
            orderId: 'abc234',
            date: 'Oct 20, 2024',
        },
        // Add more products as needed
    ];
    return (
        <div className='space-y-5'>
            <Accordion type='single' collapsible className='w-full border'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger className='mx-5 '>
                        <Title></Title>
                    </AccordionTrigger>
                    <AccordionContent className='border'>
                        <ProductList></ProductList>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type='single' collapsible className='w-full border'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger className='mx-5'>
                        Order ID: abc123
                    </AccordionTrigger>
                    <AccordionContent>
                        <ProductList></ProductList>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Dropdown;
