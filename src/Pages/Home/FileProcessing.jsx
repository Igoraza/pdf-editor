import React from 'react';
import bannerImage from '/process.svg';

import { BsSpeedometer } from 'react-icons/bs';
import { GiCheckedShield } from 'react-icons/gi';
import { LuFileStack } from 'react-icons/lu';

export default function FileProcessing() {
    return (
        <section className='mt-6'>
            <h3 className="text-center text-3xl font-bold">The fastest tool for <span className='text-green-500'>file processing</span></h3>
            <div className="h-[28rem] bg-gray-100/75 w-full mt-6">
                <div className="lg:px-36 p-3 flex items-center justify-between">
                    {/* section for the text */}
                    <div className='w-full'>
                        <TextTemplate title="Lightning Fast File Processing" icon={<BsSpeedometer />} caption="Experience a new level of speed and efficiency in processing your files." />
                        <TextTemplate title="Enhanced Security" icon={<GiCheckedShield />} caption="Your files are protected with top-notch security protocols ensuring safe processing." />
                        <TextTemplate title="Organize with Ease" icon={<LuFileStack />} caption="Easily manage and organize your files with our intuitive interface." />
                    </div>

                    {/* section for image  */}
                    <div className="h-96 w-full">
                        <img src={bannerImage} alt="The banner image" />
                    </div>
                </div>
            </div>
        </section>
    );
}

const TextTemplate = ({ title, icon, caption }) => {
    return (
        <div className="mt-8 flex items-start space-x-2">
            <h3 className='text-green-500 text-2xl'>{icon}</h3>
            <div className="flex flex-col items-start">
                <h3 className='text-lg font-bold'>{title}</h3>
                <p className='max-w-xs mt-2 text-sm text-gray-400'>{caption}</p>
            </div>
        </div>
    );
};
