import React from 'react'
import Button from './ui/button'

const DateButtons = ({ dates }: { dates: string[] }) => {
    return (
        <div className='flex flex-col gap-2'>
            {dates.map((date, idx) => (
                <Button key={idx} color='skyblue' >
                    {date}
                </Button >
            ))}
        </div>
    )
}

export default DateButtons