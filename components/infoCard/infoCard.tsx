'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useUser } from "@/providers/context";

export function InfoCard() {
    const router = useRouter();
    const { mturkId, name, response, index, response_consent } = useUser();
    const types = ['generative AI', 'an expert experienced in emotion regulation', 'generative AI', 'an expert experienced in emotion regulation'];
    const type = types[index];
    const [partner, setPartner] = useState('');

    useEffect(() => {
        if (!mturkId || !name) {
            router.push('/');
        }
    }, [mturkId, name, response, router]);

    const nextButtonHandler = () => {
        if (partner.trim() !== '') {
            router.push('/chatbot');
        } else {
            alert('Please answer the question about your discussion partner before continuing.');
        }
    };

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <div className="flex items-center justify-between">
                <CardTitle className="text-base mt-5 mb-5 text-[#212B36] md:mx-5">
                    You will be chatting with <strong>{type}</strong> to discuss your incident.
                    You will need to <strong>type</strong> for in total of 2 minutes for this discussion section in order to move on. So please make sure to type complete sentences for each message you send.
                </CardTitle>
            </div>
            <div className="mt-3 mx-5">
                <label htmlFor="partnerInput" className="block text-sm font-medium text-[#212B36]">
                Now, answer the following question and click &quot;Next&quot; to continue to the chat page. Who is your discussion partner?
                </label>
                <input
                    type="text"
                    id="partnerInput"
                    className="mt-1 block w-full px-3 py-2 border border-[#CBD5E1] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Type your answer here..."
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                />
            </div>
            <Button className="mt-5 mx-5 mb-5" variant="outline" onClick={nextButtonHandler}>Next</Button>
        </Card>
    );
}
