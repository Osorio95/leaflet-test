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

    const BING_API_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
    const yttrium_attribution = '<a href="https://yttrium-technology.com/" target="_blank">Yttrium</a>';

    return (
        <div id="map">
            <MapContainer scrollWheelZoom
                center={[8.1906335, -80.9194565]}
                zoom={8}
                className='w-full h-full z-0'>
                <LayersControl position={width! <= 768 ? "topright" : "topleft"} >
                    <LayersControl.BaseLayer checked name="google">
                        <TileLayer  attribution='&copy; Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="arcgisonline">
                        <TileLayer attribution='&copy; Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="openstreetmap">
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                </LayersControl>
                <FullscreenControl />
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