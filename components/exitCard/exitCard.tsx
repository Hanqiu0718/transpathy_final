'use client';

import { useRouter } from "next/navigation";
import { Card, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { useUser } from "@/providers/context";

export function ExitCard() {
    const router = useRouter();
    const { mturkId, name, response } = useUser();

    useEffect(() => {
        if (!mturkId || !name || !response) {
            router.push('/');
        } else {
            window.location.href = "https://ucla.qualtrics.com/jfe/form/SV_bqoCGr8VfCFZXGC";
        }
    }, [mturkId, name, response, router]);

    return (
        <Card className="w-full border-0 md:border md:border-[2px] flex-col items-center justify-center mb-10">
            <div className="flex items-center justify-between">
                <CardTitle className="text-base mt-5 mb-5 text-[#212B36] md:mx-5">
                    Last Page
                </CardTitle>
            </div>
        </Card>
    )
}
