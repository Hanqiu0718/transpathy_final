'use client';

import { Card } from '@/components/ui/card';
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
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

export function ChatbotCard() {
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const { response, mturkId, index, name } = useUser();
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{ type: 'robot', content: `I'm a timer robot served to remind you when time is up. Here's the incident that ${name} recalled. You may start the discussion now. Please note that you can only submit one message in each discussion round, so write your complete thoughts each time for better experience.`, timestamp: Date.now() }]);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [openDiscussion, setOpenDiscussion] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const hosts = [host1, host2, host3, host4];
    const host = hosts[index];
    console.log(index);
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
        setErrorMessage('');
    };

    const handleChatSubmit = async () => {
        const isFirstResponse = messages.length === 1 && response;
        const userInput = isFirstResponse ? response : inputText;
        const wordCount = userInput.trim().split(/\s+/).length;

        if (wordCount < 11) {
            setErrorMessage('Please note that you can only send one message at a time, so make sure you type what you have in your mind fully before sending the message out. You need to type more words to proceed.');
            return;
        }

        const currentTime = Date.now();
        const userMessage: Message = {
            type: 'user',
            content: userInput,
            userId: mturkId,
            timestamp: currentTime,
        };
        let updatedMessages = [...messages, userMessage];
        setInputText('');
        setInputDisabled(true);
        setMessages(updatedMessages);
        const loaderDelay = 3000 + Math.floor(Math.random() * 2000);
        const loaderTimer = setTimeout(() => {
            setLoading(true);
        }, loaderDelay);
        try {
            const updatedMessagesString = JSON.stringify(updatedMessages);
            const response: any = await host(inputText, updatedMessagesString);
            const hostMessage: Message = {
                type: 'host',
                content: response?.res ?? '',
                userId: response.name,
                timestamp: currentTime,
            };
            updatedMessages = [...updatedMessages, hostMessage];
            const randomDelay = Math.floor(Math.random() * (50 - 30 + 1) + 30) * 1000;
            setTimeout(() => {
                setMessages(updatedMessages);
                setLoading(false);
                setInputDisabled(false);
            }, randomDelay);

        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            const errorMessage: Message = {
                type: 'robot',
                content: 'An error occurred while fetching the response. Please try again.',
                timestamp: currentTime,
            };
            setMessages([...messages, errorMessage]);
            setLoading(false);
            setInputDisabled(false);
        }
    };

    useEffect(() => {
        const hostMessages = messages.filter(message => message.type === 'host');
        const userMessages = messages.filter(message => message.type === 'user');

        if (hostMessages.length === 5 && userMessages.length === 6 && !openDiscussion) {
            const nextSectionMessage: Message = {
                type: 'robot',
                content: `Time is up! Now it's time for the open discussion. If you would like to continue the discussion, feel free to continue. If you no longer want to chat, anytime, click "Next" at the bottom right of your page and exit your chat window.`,
                timestamp: Date.now(),
            };
            setMessages(prevMessages => [...prevMessages, nextSectionMessage]);
            setMessagesInDB(mturkId, [...messages, nextSectionMessage]);
            setOpenDiscussion(true);
        }

        if (hostMessages.length === 100 && userMessages.length === 100) {
            setInputDisabled(true);
            const nextSectionMessage: Message = {
                type: 'robot',
                content: "Oh, it's nice talking with you today. Good Bye!",
                timestamp: Date.now(),
            };
            setMessages(prevMessages => [...prevMessages, nextSectionMessage]);
            setMessagesInDB(mturkId, [...messages, nextSectionMessage]);
        }
    }, [messages]);

    const nextButtonHandler = () => {
        router.push('/exit');
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setInputText(prevInputText => prevInputText + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(prevState => !prevState);
    };

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <Card className="w-full md:w-[650px] mt-10 mb-10 mx-auto border-0 md:border">
                <Card
                    style={{
                        border: 'solid white',
                        overflowY: 'auto',
                    }}
                    ref={messagesContainerRef}
                    className="w-full md:w-[620px] h-[442px] mx-auto mb-5 mt-5"
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
                                                backgroundColor: '#00A08799',
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
                                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                )}
                                {message.type === 'robot' && (
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#637381' }}>
                                            Timer Robot
                                        </p>
                                        <div
                                            style={{
                                                top: '629px',
                                                left: '596.56px',
                                                padding: '12px 20px',
                                                borderRadius: '0px 16px 16px 16px',
                                                gap: '10px',
                                                backgroundColor: '#DC000099',
                                            }}
                                            className="w-full md:w-[351px]"
                                        >
                                            <p style={{ fontSize: '14px', color: '#FFFFFF' }}>
                                                {message.content}
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '10px',
                                                color: '#637381',
                                            }}
                                        >
                                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
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
                                                backgroundColor: '#3C548899',
                                            }}
                                            className="w-full md:w-[351px]"
                                        >
                                            <p style={{ fontSize: '14px', color: '#ffffff' }}>
                                                {message.content}
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: '10px',
                                                color: '#637381',
                                            }}
                                        >
                                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
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
                    <Button
                        style={{ backgroundColor: 'gray' }}
                        className="md:mx-5"
                        type="button"
                        onClick={toggleEmojiPicker}
                    >
                        😊
                    </Button>
                </form>
                {showEmojiPicker && (
                    <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
                {errorMessage && (
                    <div className="text-red-300 text-center mb-2">{errorMessage}</div>
                )}
            </Card>
            {openDiscussion && (
                <div className="flex justify-end -mt-20 mx-5 mb-5">
                    <Button className="mr-44" variant="outline" onClick={nextButtonHandler}>
                        Next
                    </Button>
                </div>
            )}
        </Card>
    );
}