'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { host1, host2, host3, host4 } from '@/server-actions';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { Textarea } from '../ui/textarea';


export function HomeCard() {
    const router = useRouter();
    const { setMturkId, setResponse, setName, setIndex } = useUser();
    const randomIndex = Math.floor(Math.random() * 4);
    
    const FormSchema = z.object({
        id: z.string().min(3, {
            message: 'Please enter your Mturk ID',
        }),
        name: z.string().min(3, {
            message: 'Please enter your name',
        }),
        response: z
            .string().min(10, {
                message: "Response must be at least 10 characters.",
            }).max(800, {
                message: "Response must not be longer than 200 words.",
            }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: '',
            response: '',
            name: '',
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setMturkId(data.id);
        setResponse(data.response);
        setName(data.name);
        setIndex(randomIndex)
        router.push('/info');
    }

    return (
        <Card className="w-full border md:border-[2px] flex-col items-center justify-center mb-10">
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                Your Details
            </CardDescription>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#212B36]">Mturk ID*</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-[#212B36]"
                                            placeholder="Enter Mturk ID"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#212B36]">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-[#212B36]"
                                            placeholder="Enter your name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="response"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#212B36]">Please recall and describe a recent
                                        work-related anger incident in detail, as well as describe the feeling of anger you had during the
                                        experience. You should write at least 200 words to continue to the next page.</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your response...."
                                            className="text-[#212B36]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-5" variant="outline" type="submit">Next</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}