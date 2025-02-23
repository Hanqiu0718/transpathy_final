'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useUser } from "@/providers/context";

export function InfoCard() {
    const router = useRouter();
    const { mturkId, name, response, index, response_consent } = useUser();
    const types = ['generative AI', 'another person who is an expert in emotion regulation', 'generative AI', 'another person who is an expert in emotion regulation'];
    const type = types[index];
    const [partner, setPartner] = useState('');

    useEffect(() => {
        if (!mturkId || !name) {
            router.push('/');
        }
    }, [mturkId, name, response, router]);

    const nextButtonHandler = () => {
        if (partner.trim() !== '') {
            router.push('/matching');
        } else {
            alert('Please answer the question about your discussion partner before continuing.');
        }
    };

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <div className="mt-3 mx-5">
                <CardTitle className="block text-sm font-medium text-[#212B36]">
                    You will be chatting with <strong>{type}</strong> to discuss your incident. Please read the following instructions carefully.<br /><br /><br />
                    <strong>Instructions for Structured Discussion:</strong><br /><br />

                    Start Message: Your recalled incident will be automatically sent to your discussion partner. They will start the conversation.<br /><br />
                    Send your message: Please note that <strong>you can only send one message at a time</strong>, so each time when it is your turn to send a message, please type all you want to say in one message for better experience.<br /><br />
                    Wait for a Reply: After sending your message, please wait for your partner to respond before you send another.<br /><br />
                    Complete <strong>Five Rounds</strong>: Continue this process until you and your partner have exchanged five messages each.<br /><br />
                    Proceed to Open Discussion: Once you have completed the five rounds, you can move to the open discussion phase.<br /><br /><br />
                   
                    <strong>Instructions for Open Discussion:</strong><br /><br />

                    No Time Limit: In the open discussion, there is no limit to how many messages you can exchange.<br /><br />
                    End Anytime: Feel free to continue discussing as long as you like, but you can end the discussion at any time if you feel the conversation has concluded.<br /><br /><br />
                </CardTitle>
            </div>
            <div className="mt-3 mx-5">
                <label htmlFor="partnerInput" className="block text-sm font-medium text-[#212B36]">
                Now, answer the following question and click &quot;Next&quot; to continue to the chat page.<br /><br /> 
                <strong>According to the instruction above, who are you chatting with?</strong>
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
