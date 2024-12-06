import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '../ui/Button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {useNavigate} from 'react-router-dom';

import {
    addDoc,
    collection,
    doc,
    setDoc,
    Timestamp,
    deleteDoc,
    query,
    where,
    getDocs,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import {db} from '@/firebase/firebaseConfig';
import {getUserData} from '@/utils/auth';
import {assets} from '@/assets/frontend_assets/assets';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Full Name must be at least 3 characters.',
    }),
    email: z.string().email({
        message: 'Invalid email address.',
    }),
    phone: z.string().min(10, {
        message: 'Phone number must be at least 10 digits.',
    }),
    address: z.string().min(5, {
        message: 'Address must be at least 5 characters.',
    }),
    city: z.string().min(2, {
        message: 'City must be at least 2 characters.',
    }),
    postalCode: z.string().min(3, {
        message: 'Postal code must be at least 3 characters.',
    }),
    state: z.string().min(3, {
        message: 'State must be at least 3 characters.',
    }),
    country: z.string().min(3, {
        message: 'Country must be at least 3 characters.',
    }),
});

// Define the carts interface
interface Cart {
    cartID: string;
    prodID: string;
    qty: number;
    userID: string;
}

// Define the products interface
interface Product {
    prodID: string;
    p1: keyof typeof assets;
    p2: keyof typeof assets;
    p3: keyof typeof assets;
    p4: keyof typeof assets;
    prodName: string;
    prodPrice: number;
    catID: string;
    genderID: string;
    inventoryID: string;
}

interface ProfileFormProps {
    cart: (Product & Cart)[]; // Accept combined data
}

export function ProfileForm({cart}: ProfileFormProps) {
    const navigate = useNavigate();
    // ...

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            state: '',
            country: '',
        },
    });

    const getUserEmail = async (userID: string) => {
        try {
            // Get a reference to the user's document in the 'Users' collection
            const userDocRef = doc(db, 'Users', userID); // Replace 'Users' with your actual collection name if different

            // Fetch the document data
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                // Retrieve the email from the document
                const userEmail = userDoc.data()?.email;
                console.log('User email:', userEmail);
                return userEmail;
            } else {
                console.error('No user found with the provided userID');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user email:', error);
            return null;
        }
    };

    // Function to check stock for each cart item
    const checkStockAvailability = async () => {
        for (let item of cart) {
            const inventoryRef = doc(db, 'Inventory', item.inventoryID);
            const inventorySnapshot = await getDoc(inventoryRef);

            if (inventorySnapshot.exists()) {
                const inventoryData = inventorySnapshot.data();
                const prodQty = inventoryData?.prodQty || 0;

                if (prodQty < item.qty) {
                    // Stock not sufficient for this item
                    return {
                        success: false,
                        productName: item.prodName,
                        availableStock: prodQty,
                    };
                }
            }
        }
        return {success: true}; // If all items have enough stock
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Get the user data (assuming user is logged in)
        const userData = getUserData();
        if (!userData) {
            navigate('/'); // Redirect if user is not logged in
            return;
        }

        const userID = userData.userID;
        // Retrieve the user's email from Firestore
        const userEmail = await getUserEmail(userID);
        if (!userEmail) {
            console.error('User email not found');
            return;
        }

        // Check stock availability for all cart items
        const stockCheck = await checkStockAvailability();
        if (!stockCheck.success) {
            // Show error message for insufficient stock
            alert(
                `Not enough stock for ${stockCheck.productName}. Available stock: ${stockCheck.availableStock}`,
            );
            return; // Prevent form submission
        }

        // Calculate the total price and collect cart details
        const totalPrice =
            cart.reduce(
                (acc, item) => acc + (item.prodPrice ?? 0) * (item.qty ?? 0),
                0,
            ) + 15; // Adding shipping cost

        // Step 1: Create Order document
        try {
            const orderRef = await addDoc(collection(db, 'Order'), {
                userID,
                address: values.address,
                city: values.city,
                country: values.country,
                postalCode: values.postalCode,
                state: values.state,
                totalPrice,
                date: Timestamp.now(), // Add current timestamp
            });

            // // // After order is created, send email confirmation
            // // const emailData = {
            // //     name: values.name,
            // //     user_email: userEmail,
            // //     receipt_link: `http://localhost:5173/${orderRef.id}`, // Replace with actual receipt URL
            // // };

            // // After order is created, send email confirmation using Postmark
            // const subject = 'Your receipt from TOMATO';
            // // const text = `Thank you for your order, ${values.name}! Your order total is $${totalPrice}.`;
            // const html = `
            //     <p>Hi ${values.name},</p>

            //     <p>Thank you for your purchase!</p>

            //     <p>Your order has been successfully processed. You can view your receipt by clicking the link below:</p>

            //     <p>
            //     <a href="http://localhost:5173/${orderRef.id}" target="_blank" style="display: inline-block; background-color: tomato; color: white; padding: 12px 25px; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold; font-family: 'Poppins', sans-serif;">
            //         View Receipt
            //     </a>
            //     </p>

            //     <p>We hope to serve you again soon!</p>

            //     <p>Best regards,<br>TOMATO</p>
            // `;

            // await sendEmail(userEmail, subject, '', html); // Send email using Postmark

            const orderID = orderRef.id; // Use the newly created order's ID

            // Function to generate custom orderDeetsID
            const generateOrderDeetsID = (orderID: string, prodID: string) => {
                return `${orderID}_${prodID}`; // Custom format for orderDeetsID
            };

            for (let item of cart) {
                const orderDeetsID = generateOrderDeetsID(orderID, item.prodID);

                // Step 3: Update Inventory
                const inventoryRef = doc(db, 'Inventory', item.inventoryID);
                const inventorySnapshot = await getDoc(inventoryRef);

                if (inventorySnapshot.exists()) {
                    const inventoryData = inventorySnapshot.data();
                    const prodQty = inventoryData?.prodQty || 0;
                    const soldQty = inventoryData?.soldQty || 0;

                    // Check if there is enough stock
                    if (prodQty < item.qty) {
                        console.error(`Not enough stock for ${item.prodName}`);
                        return; // You can show a message here to the user about the stock issue
                    }

                    // Update inventory: Decrease prodQty and increase soldQty
                    await updateDoc(inventoryRef, {
                        prodQty: prodQty - item.qty,
                        soldQty: soldQty + item.qty,
                    });
                } else {
                    console.error(`Inventory not found for ${item.prodName}`);
                }

                // Add the item to OrderDetails collection
                await addDoc(collection(db, 'OrderDetails'), {
                    orderDeetsID,
                    orderID, // Link to the order
                    prodID: item.prodID,
                    price: item.prodPrice,
                    qty: item.qty,
                });
            }

            await setDoc(
                orderRef,
                {
                    orderID: orderRef.id, // Explicitly store the orderID field if necessary
                },
                {merge: true},
            );

            // Step 3: Delete Cart items after order creation
            const cartQuery = query(
                collection(db, 'Cart'),
                where('userID', '==', userID),
            );
            const cartSnapshot = await getDocs(cartQuery);

            // Iterate through the cart items and delete them
            cartSnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, 'Cart', docSnapshot.id));
            });

            // Redirect to home or another page after successful submission
            navigate('/');
        } catch (error) {
            console.error('Error creating order: ', error);
            // Handle error (show message to the user)
        }
    };

    return (
        <Form {...form}>
            <div className='max-w-xl p-4'>
                <h2 className='text-3xl text-tomato font-semibold mb-4'>
                    Contact Information
                </h2>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-3 '
                >
                    {/* Username */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='shadcn' {...field} />
                                </FormControl>
                                {/* Display error message for this field */}
                                <FormMessage>
                                    {form.formState.errors.name && (
                                        <span>
                                            {form.formState.errors.name.message}
                                        </span>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='shadcn@example.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.name && (
                                        <span>
                                            {form.formState.errors.name.message}
                                        </span>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder='123456789' {...field} />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.name && (
                                        <span>
                                            {form.formState.errors.name.message}
                                        </span>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Address */}
                    <FormField
                        control={form.control}
                        name='address'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='123 Menara LGB...'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.name && (
                                        <span>
                                            {form.formState.errors.name.message}
                                        </span>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-col sm:flex-row sm:space-x-4'>
                        {/* City */}
                        <FormField
                            control={form.control}
                            name='city'
                            render={({field}) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Your city'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.name && (
                                            <span>
                                                {
                                                    form.formState.errors.name
                                                        .message
                                                }
                                            </span>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        {/* Postal code */}
                        <FormField
                            control={form.control}
                            name='postalCode'
                            render={({field}) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder='12345' {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.name && (
                                            <span>
                                                {
                                                    form.formState.errors.name
                                                        .message
                                                }
                                            </span>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='flex flex-col sm:flex-row sm:space-x-4'>
                        {/* State */}
                        <FormField
                            control={form.control}
                            name='state'
                            render={({field}) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Kuala Lumpur'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.name && (
                                            <span>
                                                {
                                                    form.formState.errors.name
                                                        .message
                                                }
                                            </span>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        {/* Country */}
                        <FormField
                            control={form.control}
                            name='country'
                            render={({field}) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Malaysia'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.name && (
                                            <span>
                                                {
                                                    form.formState.errors.name
                                                        .message
                                                }
                                            </span>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div style={{marginTop: '50px', marginLeft: '100px'}}>
                        {/* <Link to={'/'}> */}
                        <Button
                            className='flex items-center justify-center gap-8 shadow-xl shadow-Orange/30 hover:bg-white hover:text-tomato hover:border hover:border-tomato'
                            variant='destructive'
                            type='submit'
                        >
                            Continue
                        </Button>
                        {/* </Link> */}
                    </div>
                </form>
            </div>
        </Form>
    );
}
