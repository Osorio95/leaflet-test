'use client'
import { getRandomColorRGB } from '@/utils/utils'
import { LatLngExpression, divIcon, DivIcon } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

type Props = {
    trigger: number
    changeBtn: (color: string) => void
}

const MainMap = ({ changeBtn, trigger }: Props) => {
    return (
        <div id="map">
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                className='w-full h-full z-0'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker changeBtn={(color) => changeBtn(color)} trigger={trigger} />
            </MapContainer>
        </div>
    );
}

type customMarker = {
    location: LatLngExpression
    icon: DivIcon
}

const LocationMarker = ({ changeBtn, trigger }: Props) => {
    const [markers, setMarkers] = useState<customMarker[]>([])

    const customIcon = (cn: string) => divIcon({
        className: "rounded-full border-2 border-black overflow-hidden",
        html: `<div style="background-color: ${cn}; height: 100%; width: 100%;"></div>`,
        iconSize: [36, 36],
    });

    const map = useMapEvents({
        click(e) {
            const cn = getRandomColorRGB()
            setMarkers([...markers, { location: e.latlng, icon: customIcon(cn) }])
            changeBtn(cn)
        },
    })

    useEffect(() => {
        setMarkers([])
        changeBtn("")
    }, [trigger])

    return (
        <>
            {markers.map((mark, idx) => (
                <Marker key={`marker-${idx}`} position={mark.location} icon={mark.icon} >

                </Marker>
            ))}
        </>
    )
}

export default MainMap