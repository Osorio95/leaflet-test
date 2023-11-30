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

    const [farmSelected, setFarmSelected] = useState<boolean>(false)

    const removeHandler = () => {
        setTrigger(prev => prev++)
        setFarmSelected(prev => !prev)
    }

    const clickMapHandler = (e: string) => {
        setButtonName(e)
        removeHandler()
    }

    return (
        <main>
            <MainMap changeBtn={clickMapHandler} trigger={trigger} />
            {farmSelected &&
                <UI colorBtn={buttonName} removeHandler={() => removeHandler()} />
            }
        </main>
    )
}

export default Home
