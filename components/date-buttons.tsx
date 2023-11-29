import React, { useMemo, useState } from 'react'
import Button from './ui/button'
import { useScrollContainer } from 'react-indiana-drag-scroll';
import { DateData } from '@/types/data';
import { scaleSequential } from 'd3-scale';
import { interpolateRdYlGn } from 'd3-scale-chromatic';


const DateButtons = ({ dates }: { dates: DateData[] }) => {
    const scrollContainer = useScrollContainer()
    const colorScale = scaleSequential(interpolateRdYlGn);

    const nuevoArray = useMemo(() => {
        return dates.map(date => {
            const fecha = date.date.slice(0, 10);
            const [anio, mes, dia] = fecha.split("-");
            const hora = date.date.slice(11, 19);
            const ndvi = colorScale(date.ndvi)

            return {
                dia,
                mes,
                hora,
                ndvi
            };
        });
    }, [dates]);

    return (
        <div ref={scrollContainer.ref} className='flex md:flex-col text-black gap-2 overflow-x-auto py-2'>
            {nuevoArray.map((date, idx) => (
                <Button key={idx} color={date.ndvi} >
                    {date.dia}-{date.mes} / {date.hora}
                </Button >
            ))}
        </div>
    )
}

export default DateButtons