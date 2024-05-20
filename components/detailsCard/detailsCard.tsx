'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { useEffect } from 'react';
import { Textarea } from '../ui/textarea';

export function DetailsCard() {
  const router = useRouter();
  const { response_consent, setMturkId, setName, setIndex, setResponse } = useUser();
  const randomIndex = Math.floor(Math.random() * 4);

  useEffect(() => {
    if (!response_consent) {
      router.push('/');
    }
  }, [response_consent, router]);

  const FormSchema = z.object({
    id: z.string().min(3, {
      message: 'Please enter your Mturk ID',
    }),
    name: z.string().min(3, {
      message: 'Please enter your name',
    }),
    response: z
      .string().min(800, {
        message: "Response must be at least 200 words.",
      }),
    currentAngry: z.string().min(1, {
      message: 'Please select an option',
    }),
    jobSatisfaction: z.string().min(1, {
      message: 'Please select an option',
    }),
    upset: z.string().min(1, {
      message: 'Please select an option',
    }),
    hostile: z.string().min(1, {
      message: 'Please select an option',
    }),
    alert: z.string().min(1, {
      message: 'Please select an option',
    }),
    ashamed: z.string().min(1, {
      message: 'Please select an option',
    }),
    inspired: z.string().min(1, {
      message: 'Please select an option',
    }),
    nervous: z.string().min(1, {
      message: 'Please select an option',
    }),
    determined: z.string().min(1, {
      message: 'Please select an option',
    }),
    attentive: z.string().min(1, {
      message: 'Please select an option',
    }),
    afraid: z.string().min(1, {
      message: 'Please select an option',
    }),
    active: z.string().min(1, {
      message: 'Please select an option',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: '',
      response: '',
      name: '',
      currentAngry: '',
      jobSatisfaction: '',
      upset: '',
      hostile: '',
      alert: '',
      ashamed: '',
      inspired: '',
      nervous: '',
      determined: '',
      attentive: '',
      afraid: '',
      active: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setMturkId(data.id);
    setName(data.name);
    setResponse(data.response);
    setIndex(randomIndex);
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
                  <FormLabel className="text-[#212B36]">Please recall and describe a recent work-related anger incident in detail, as well as describe the feeling of anger you had during the experience. You should write at least 200 words to continue to the next page.</FormLabel>
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
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-5 text-[#212B36] pb-3 md:pb-0">
              Please answer the following questions before you move on to chat with a partner.
            </CardDescription>

            {/* Current Anger */}
            <FormField
              control={form.control}
              name="currentAngry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36] font-bold">Think about your recalled incident, to what extent do you feel angry?</FormLabel>
                  <FormControl>
                    <div className="space-y-2 text-sm">
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="not at all"
                          checked={field.value === 'not at all'}
                          onChange={() => field.onChange('not at all')}
                          className="mr-2"
                        />
                        Not at all
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="slightly"
                          checked={field.value === 'slightly'}
                          onChange={() => field.onChange('slightly')}
                          className="mr-2"
                        />
                        Slightly
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="moderately"
                          checked={field.value === 'moderately'}
                          onChange={() => field.onChange('moderately')}
                          className="mr-2"
                        />
                        Moderately
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="very"
                          checked={field.value === 'very'}
                          onChange={() => field.onChange('very')}
                          className="mr-2"
                        />
                        Very
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="extremely"
                          checked={field.value === 'extremely'}
                          onChange={() => field.onChange('extremely')}
                          className="mr-2"
                        />
                        Extremely
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Satisfaction */}
            <FormField
              control={form.control}
              name="jobSatisfaction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#212B36] font-bold">How are you satisfied with your job?</FormLabel>
                  <FormControl>
                    <div className="space-y-2 text-sm">
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="extremely unsatisfied"
                          checked={field.value === 'extremely unsatisfied'}
                          onChange={() => field.onChange('extremely unsatisfied')}
                          className="mr-2"
                        />
                        Extremely unsatisfied
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="moderately unsatisfied"
                          checked={field.value === 'moderately unsatisfied'}
                          onChange={() => field.onChange('moderately unsatisfied')}
                          className="mr-2"
                        />
                        Moderately unsatisfied
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="neither satisfied nor unsatisfied"
                          checked={field.value === 'neither satisfied nor unsatisfied'}
                          onChange={() => field.onChange('neither satisfied nor unsatisfied')}
                          className="mr-2"
                        />
                        Neither satisfied nor unsatisfied
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="moderately satisfied"
                          checked={field.value === 'moderately satisfied'}
                          onChange={() => field.onChange('moderately satisfied')}
                          className="mr-2"
                        />
                        Moderately satisfied
                      </label>
                      <label className="block my-1">
                        <input
                          type="radio"
                          name={field.name}
                          value="extremely satisfied"
                          checked={field.value === 'extremely satisfied'}
                          onChange={() => field.onChange('extremely satisfied')}
                          className="mr-2"
                        />
                        Extremely satisfied
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Current Emotions */}
            <FormItem>
              <FormLabel className="text-[#212B36] font-bold">
                Thinking about yourself and how you feel at this moment, to what extent do you feel the following now:
              </FormLabel>
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300"></th>
                    <th className="font-normal border border-gray-300">Very slightly or not at all</th>
                    <th className="font-normal border border-gray-300">A little</th>
                    <th className="font-normal border border-gray-300">Moderately</th>
                    <th className="font-normal border border-gray-300">Quite a bit</th>
                    <th className="font-normal border border-gray-300">Extremely</th>
                  </tr>
                </thead>
                <tbody>
                  {['upset', 'hostile', 'alert', 'ashamed', 'inspired', 'nervous', 'determined', 'attentive', 'afraid', 'active'].map((emotion, index) => (
                    <tr key={emotion} className={index < 9 ? 'border-b border-gray-300' : ''}>
                      <td className="border border-gray-300 text-center">{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</td>
                      {['very slightly or not at all', 'a little', 'moderately', 'quite a bit', 'extremely'].map((value) => (
                        <td key={value} className="text-center border border-gray-300">
                          <FormField
                            control={form.control}
                            name={emotion as keyof z.infer<typeof FormSchema>}
                            render={({ field }) => (
                              <FormControl>
                                <input
                                  type="radio"
                                  name={field.name}
                                  value={value}
                                  checked={field.value === value}
                                  onChange={() => field.onChange(value)}
                                  className="mx-auto"
                                />
                              </FormControl>
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </FormItem>

            <Button className="mt-5" variant="outline" type="submit">Next</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
