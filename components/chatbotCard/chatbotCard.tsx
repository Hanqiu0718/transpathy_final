'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React, { useEffect, useRef, useState } from 'react';
import vector from '../../public/vector.svg';
import Image from 'next/image';
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/global';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/context';
import { host1, host2, host3, host4, setMessagesInDB } from '@/server-actions';
import { useToast } from '../ui/use-toast';

const hosts = [host1, host2, host3, host4];
const randomIndex = Math.floor(Math.random() * 3);
const host = hosts[randomIndex];

export function ChatbotCard() {

    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const { response, mturkId } = useUser();
    const [inputDisabled, setInputDisabled] = useState(false);
    const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
    const [typingTime, setTypingTime] = useState<number>(0);
    const [openDiscussion, setOpenDiscussion] = useState(false);
    const [resetCount, setResetCount] = useState<number>(0);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast()

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!response || !mturkId) {
            router.push('/');
        } else {
            handleChatSubmit();
        }
    }, [response, mturkId, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        if (!typingStartTime) {
            setTypingStartTime(Date.now());
        }
    };
    const handleChatSubmit = async () => {
        const isFirstResponse = messages.length === 0 && response;
        const userInput = isFirstResponse ? response : inputText;
        const userMessage: Message = {
            type: 'user',
            content: userInput,
            userId: mturkId,
        };
        let updatedMessages = [...messages, userMessage];
        setInputText('');
        setInputDisabled(true)
        setMessages(updatedMessages);
        setLoading(true);
        try {
            const response: any = await host(inputText, updatedMessages);
            const hostMessage: Message = {
                type: 'host',
                content: response?.res ?? '',
                userId: response.name,
            };
            updatedMessages = [...updatedMessages, hostMessage];
            await setMessagesInDB([userMessage, hostMessage]);
            setTimeout(async () => {
                setMessages(updatedMessages);
                setLoading(false);
                setInputDisabled(false);
            }, 2000);
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            const errorMessage: Message = {
                type: 'host',
                content:
                    'An error occurred while fetching the response. Please try again.',
            };
            setMessages([...messages, errorMessage]);
            setLoading(false);
            setInputDisabled(false);
        }
    };
    const handleKeyUp = () => {
        if (typingStartTime) {
            const timeDifference = Date.now() - typingStartTime;
            setTypingTime((prevTypingTime) => prevTypingTime + timeDifference / 1000);
            setTypingStartTime(null);
        }
    };
    useEffect(() => {
        return () => {
            if (typingStartTime) {
                setTypingTime((prevTypingTime) => prevTypingTime + (Date.now() - typingStartTime) / 1000);
                setTypingStartTime(null);
            }
        };
    }, [inputText]);

    useEffect(() => {
        if (resetCount < 1 && typingTime >= 150 && typingTime <160) {
            toast({
                variant: "destructive",
                title: '30 seconds left for this section',
            });
        }

        if (resetCount === 1) {
            setOpenDiscussion(true);
        }

        if (resetCount === 1 && typingTime >= 90 && typingTime <100) {
            toast({
                variant: "destructive",
                title: '30 seconds left for this section',
            });
        }

        if (resetCount === 1 && typingTime >= 120) {
            setInputDisabled(true);
            const nextSectionMessage: Message = {
                type: 'host',
                content: "Oh, it's nice talking with you today. Good Bye!",
                userId: 'Host',
            };
            setMessages(prevMessages => [...prevMessages, nextSectionMessage]);
        }

        if (resetCount < 1 && typingTime >= 180) {
            toast({
                variant: "destructive",
                title: 'Time is up for this section.',
            });
            const nextSectionMessage: Message = {
                type: 'host',
                content: "Let's move on to open discussion.",
                userId: 'Host',
            };
            setMessages(prevMessages => [...prevMessages, nextSectionMessage]);
            setTypingTime(0);
            setResetCount(prevCounter => prevCounter + 1);
        }
    }, [resetCount, typingTime]);

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <Card className="w-full md:w-[650px] mt-10 mb-10 mx-auto border-0 md:border">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base mt-5 mb-5 text-[#212B36] md:mx-5">
                        Thanks for recalling the anger incident! You are now paired with a partner to help you resolve the angry feelings and provide solutions. Your partner is an AI designed to help with emotion regulation / an expert who is experienced in emotion regulation                    </CardTitle>
                </div>
                <CardDescription className="font-semibold text-xl text-[#212B36] md:mx-5 mb-5">
                    Participant Time: {Math.floor(typingTime / 60)} minutes {Math.floor((typingTime % 60))} seconds
                </CardDescription>
                {openDiscussion && <CardDescription className="text-base text-[#212B36] md:mx-5 mb-5">
                    Open Discussion Time
                </CardDescription>
                }
                <hr className="w-full mb-10" />
                <Card
                    style={{
                        border: 'solid white',
                        overflowY: 'auto',
                    }}
                    ref={messagesContainerRef}
                    className="w-full md:w-[620px] h-[442px] mx-auto mb-5"
                >
                    <div className="flex flex-col space-y-5">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={message.type === 'user' ? 'text-right' : 'text-left'}
                            >
                                {message.type === 'user' && (
                                    <div className="mr-5">
                                        <div
                                            style={{
                                                display: 'inline-block',
                                                padding: '12px 20px',
                                                borderRadius: '16px 16px 0px 16px',
                                                gap: '10px',
                                                backgroundColor: '#3056D3',
                                                marginLeft: 'auto',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#FFFFFF',
                                                }}
                                            >
                                                {message.content}
                                            </p>
                                        </div>
                                        <p style={{ fontSize: '10px', color: '#637381' }}>
                                            {new Date().toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                )}
                                {message.type === 'host' && (
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#637381' }}>
                                            Discussion Partner
                                        </p>
                                        <div
                                            style={{
                                                top: '629px',
                                                left: '596.56px',
                                                padding: '12px 20px',
                                                borderRadius: '0px 16px 16px 16px',
                                                gap: '10px',
                                                backgroundColor: '#F4F7FF',
                                            }}
                                            className="w-full md:w-[351px]"
                                        >
                                            <p style={{ fontSize: '14px', color: '#637381' }}>
                                                {message.content}
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '10px',
                                                color: '#637381',
                                            }}
                                        >
                                            {new Date().toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && <PulseLoader size={5} />}
                    </div>
                </Card>

                <hr className="w-full mt-10" />
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex items-center space-x-3 md:space-x-0 justify-between mb-5 mt-5 w-full"
                >
                    <Input
                        style={{ backgroundColor: '#F4F7FF' }}
                        className="w-full md:w-[550px] md:mx-5"
                        placeholder="Type something here..."
                        required={true}
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyUp={handleKeyUp}
                        disabled={inputDisabled}
                    />
                    <Button
                        style={{ backgroundColor: 'green' }}
                        className="md:mx-5"
                        type="submit"
                        onClick={handleChatSubmit}
                        disabled={inputDisabled}
                    >
                        <Image
                            src={vector}
                            className="mb-5 mt-5"
                            alt="Vector Icon"
                            width={20}
                            height={20}
                        />
                    </Button>
                </form>
            </Card>
        </Card>
    );
}
