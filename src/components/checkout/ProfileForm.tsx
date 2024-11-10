import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '../ui/button';
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
import {Link} from 'react-router-dom';

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

export function ProfileForm() {
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <div className='max-w-xl p-4'>
                <h2 className='text-lg font-bold mb-4'>Contact Information</h2>
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
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage /> */}
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
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <Link to={'/'}>
                            <Button className='w-full my-6' type='submit'>
                                Continue
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </Form>
    );
}
