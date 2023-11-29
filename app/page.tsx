'use client'
import UI from '@/components/main-ui';
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
            <UI colorBtn={buttonName} removeHandler={() => removeHandler()} />
        </main>
    )
}

export default Home
