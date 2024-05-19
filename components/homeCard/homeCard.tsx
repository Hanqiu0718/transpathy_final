'use client';

import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { Card, CardDescription } from '../ui/card';
import { useRouter } from 'next/navigation'
import { useUser } from '@/providers/context';

export function HomeCard() {
    const router = useRouter();
    const { response_consent, setResponse_consent } = useUser();

    const handleYesClick = () => {
        setResponse_consent('yes');
        router.push('/details');
    };
    const handleNoClick = () => {
        setResponse_consent('no');
    };

    const ConsentList = () => {
        return (
            <ul className="list-disc list-inside">
                <li className="mt-5 text-[#212B36] md:mx-5">You can choose whether or not you want to be in this study, and you may withdraw your consent and discontinue participation at any time.</li>
                <li className="text-[#212B36] md:mx-5">Whatever decision you make, there will be no penalty to you, and no loss of benefits to which you were otherwise entitled.</li>
                <li className="text-[#212B36] md:mx-5">You may refuse to answer any questions that you do not want to answer and still remain in the study.</li>
            </ul>
        );
    };

    return (
        <Card className="w-full border md:border-[2px] flex-col items-center justify-center mb-10">
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                Welcome to our Anger at Work Study!
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                INTRODUCTION
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                You were selected as a possible participant in this study because you are a US citizen, over 18, fluent in English, full-time employed, member of Mturk. Your participation in this research study is voluntary. We cannot tell you every detail of this study ahead of time, but if you are willing to participate under these conditions, we will explain the procedure to you fully after your participation.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                WHAT SHOULD I KNOW ABOUT A RESEARCH STUDY?
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                * Someone will explain this research study to you.<br />
                * Whether or not you take part is up to you.<br />
                * You can choose not to take part.<br />
                * You can agree to take part and later change your mind.<br />
                * Your decision will not be held against you.<br />
                * You can ask all the questions you want before you decide.<br />
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                WHY IS THIS RESEARCH BEING DONE?
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                We aim to investigate people`s anger experience at work.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                HOW LONG WILL THE RESEARCH LAST AND WHAT WILL I NEED TO DO?
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                Participation will take a total of about 20 mins. You will be asked to answer some questions about yourself and interact with a partner. You will also be answering demographic questions.
                If you volunteer to participate in this study, you will be filling out a list of questionnaires online and chat with a partner. The study can be done anytime during the day. You will possibly be contacted for future research.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                HOW LONG WILL THE RESEARCH LAST AND WHAT WILL I NEED TO DO?
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                We don`t believe there are any extreme risks by participating in this research. The study may cause the risk of breach of confidentiality.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                ARE THERE ANY BENEFITS IF I PARTICIPATE?
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                You will not directly benefit from your participation in the research.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                HOW WILL INFORMATION ABOUT ME AND MY PARTICIPATION BE KEPT CONFIDENTIAL?
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                The researchers will do their best to make sure that your private information is kept confidential. Information about you will be handled as confidentially as possible, but participating in research may involve a loss of privacy and the potential for a breach in confidentiality. Study data will be physically and electronically secured.  As with any use of electronic means to store data, there is a risk of breach of data security.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                Use of personal information that can identify you:
            </CardDescription>
            <CardDescription className="text-[#212B36] md:mx-5">
                The data and/or specimens will not be labeled with any personal identifying information, nor with a code that the research team can link to personal identifying information when acquired by the investigator for this research.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                How information about you will be stored:
            </CardDescription>
            <CardDescription className="text-[#212B36] md:mx-5">
                We will destroy MTurk IDs after payments are processed, de-linking MTurk IDs from survey data immediately after data collection, ensuring that Qualtrics settings are such that no IP address or geolocation data are collected, in order to minimize the risk of breach of confidentiality.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                People and agencies that will have access to your information:
            </CardDescription>
            <CardDescription className="text-[#212B36] md:mx-5">
                We will deidentify data after collecting it and identification will be stripped from dataset when being shared with research team.
            </CardDescription>
            <CardDescription className="mt-2 text-[#212B36] md:mx-5">
                The research team, authorized UCLA personnel, and the study sponsor, may have access to study data and records to monitor the study. Research records provided to authorized, non-UCLA personnel will not contain identifiable information about you. Publications and/or presentations that result from this study will not identify you by name.
            </CardDescription>
            <CardDescription className="mt-2 text-[#212B36] md:mx-5">
                Employees of the University may have access to identifiable information as part of routine processing of your information, such as lab work or processing payment. However, University employees are bound by strict rules of confidentiality.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                How long information from the study will be kept:
            </CardDescription>
            <CardDescription className="text-[#212B36] md:mx-5">
                The research data will be used for possible future research.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                USE OF DATA FOR FUTURE RESEARCH
            </CardDescription>
            <CardDescription className="text-[#212B36] md:mx-5">
                Your data, including de-identified data may be kept for use in future research.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                WILL I BE PAID FOR MY PARTICIPATION?
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                You will receive $3 for your time and effort.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                WHO CAN I CONTACT IF I HAVE QUESTIONS ABOUT THIS STUDY?
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                UCLA Office of the Human Research Protection Program (OHRPP)
            </CardDescription>
            <CardDescription className="mt-5 text-[#212B36] md:mx-5">
                If you have questions about your rights as a research subject, or you have concerns or suggestions and you want to talk to someone other than the researchers, you may contact the UCLA OHRPP by phone: (310) 206-2040; by email: <a href="mailto:participants@research.ucla.edu" className="text-blue-500 underline">participants@research.ucla.edu</a> or by mail: Box 951406, Los Angeles, CA 90095-1406.
            </CardDescription>
            <CardDescription className="font-semibold text-xl border-b md:border-b-0 mt-3 text-[#212B36] md:mx-5 pb-3 md:pb-0">
                WHAT ARE MY RIGHTS IF I TAKE PART IN THIS STUDY?
            </CardDescription>
            <ConsentList />
            <CardDescription className="mt-5 mb-5 text-[#212B36] md:mx-5">
                By clicking on the button below, you indicate that you are above 18 years old, have read the above information, have been informed of the nature of the study, and that you agree to participate in the study.
            </CardDescription>
            <Button className="md:mx-5 mb-5" variant="outline" onClick={handleYesClick} disabled={response_consent === 'no'}>Yes</Button>
            <Button variant="outline" onClick={handleNoClick} disabled={response_consent === 'no'}>No</Button>
            {response_consent === 'no' && (
                <Alert>
                    Thank you for your interest in participation. Since you decided to not continue with our study, your participation has ended.
                </Alert>
            )}
        </Card>
    );
}
function setHostFunction(arg0: (inputText: any, updatedMessages: any) => Promise<{ res: string | null; name: string; } | undefined>) {
    throw new Error('Function not implemented.');
}

