import React from 'react'
import Button from './ui/button'
import { useWindowSize } from '@uidotdev/usehooks'
import ClimateDateTemp from './climate-date-temp'
import DateButtons from './date-buttons'
import { DateData } from '@/types/data'

type Props = {
    colorBtn: string
    removeHandler: () => void
}

const UI = ({ colorBtn, removeHandler }: Props) => {
    const { width } = useWindowSize()

    const datesArr: DateData[] = [
        {date: "2023-11-28T14:30:00Z", ndvi: 0.1},
        {date: "2023-11-23T09:15:00Z", ndvi: 0.3},
        {date: "2023-11-18T20:45:00Z", ndvi: 0.9},
        {date: "2023-12-13T03:00:00Z", ndvi: 0.6},
        {date: "2023-11-08T18:20:00Z", ndvi: 0.5},
        {date: "2023-11-03T11:50:00Z", ndvi: 0.4},
        {date: "2023-11-29T22:10:00Z", ndvi: 0.7}
    ]

    return (
        <div className='absolute flex flex-col justify-end md:grid md:grid-cols-12 top-0 bottom-0 right-0 left-0 p-2 pointer-events-none z-50'>
            {/* Small container for date and climate in desktop */}
            {width! > 768 && (
                <div className="col-span-2 col-start-1 flex flex-col justify-end">
                    <div className="bg-black bg-opacity-50 text-white p-2 rounded-lg pointer-events-auto">
                        <ClimateDateTemp />
                    </div>
                </div>
            )}
            {/* Large and main container, is responsive */}
            <div className="md:col-span-2 md:col-start-11 bg-black bg-opacity-50 text-white p-2 rounded-lg pointer-events-auto">
                {width! <= 768 && (
                    <ClimateDateTemp />
                )}
                <DateButtons dates={datesArr} />
            </div>
        </div>
    )
}

export default UI