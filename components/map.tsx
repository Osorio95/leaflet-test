'use client'
import { getRandomColorRGB } from '@/utils/utils'
import { useWindowSize } from "@uidotdev/usehooks";
import { LatLngExpression, divIcon, DivIcon } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, LayersControl } from 'react-leaflet'
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";

type Props = {
    trigger: number
    changeBtn: (color: string) => void
}

const MainMap = ({ changeBtn, trigger }: Props) => {
    const { width } = useWindowSize()

    return (
        <div id="map">
            <MapContainer scrollWheelZoom
                center={[8.1906335, -80.9194565]}
                zoom={8}
                className='w-full h-full z-0'>
                <LayersControl position={width! <= 768 ? "topright" : "topleft"} >
                    <LayersControl.BaseLayer checked name="arcgisonline">
                        <TileLayer 
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="openstreetmap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                </LayersControl>
                <FullscreenControl />
                <LocationMarker changeBtn={(e) => changeBtn(e)} trigger={trigger} />
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