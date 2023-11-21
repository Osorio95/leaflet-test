'use client'
import ToolBar from '@/components/tool-bar';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MainMap = dynamic(() => import('@/components/map'), {
    ssr: false
});

const Home = () => {
    const [buttonName, setButtonName] = useState<string>("")
    const [trigger, setTrigger] = useState(0)

    const removeHandler = () => {
        setTrigger(prev => prev += 1)
    }

    return (
        <main>
            <MainMap changeBtn={setButtonName} trigger={trigger} />
            <ToolBar colorBtn={buttonName} removeHandler={() => removeHandler()} />
        </main>
    )
}

export default Home
