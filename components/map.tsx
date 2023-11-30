'use client'
import { getRandomColorRGB, parseCoordinates } from '@/utils/utils'
import { useWindowSize } from "@uidotdev/usehooks";
import { LeafletMouseEvent, LatLngLiteral, LatLngExpression, LeafletEventHandlerFnMap, LeafletMouseEventHandlerFn } from 'leaflet'
import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, LayersControl, Polygon } from 'react-leaflet'
import { FullscreenControl } from "react-leaflet-fullscreen";
import { kmls } from '@/data/kmls';
import "react-leaflet-fullscreen/styles.css";
import { PolyObj } from '@/types/data';

type Props = {
    trigger: number
    changeBtn: (color: string) => void
}

const MainMap = ({ changeBtn, trigger }: Props) => {
    const { width } = useWindowSize()
    const [selectedFarm, setSelectedFarm] = useState<number>(1)

    const polygons = useMemo(() => {
        let polyObj: PolyObj[] = []
        kmls.map((kml, idx) => {
            const parser = new DOMParser();
            const singleKml = parser.parseFromString(kml, 'text/xml');
            const polygon = parseCoordinates(singleKml.getElementsByTagName('coordinates')[0].textContent!)
            const name = (singleKml.getElementsByTagName('name')[0].textContent!).split('.kml')[0]

            polyObj.push({ id: polyObj.length, name: name, coordinates: polygon, value: null })
        })
        return polyObj
    }, [kmls])

    const eventHandler = {
            click: (e: LeafletMouseEvent) => {
                changeBtn(e.target)
            }
    }

    return (
        <div id="map">
            <MapContainer scrollWheelZoom
                center={[8.1906335, -80.9194565]}
                zoom={8}
                className='w-full h-full z-0'>
                <LayersControl position={width! <= 768 ? "topright" : "topleft"} >
                    <LayersControl.BaseLayer checked name="google">
                        <TileLayer attribution='&copy; Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
                    </LayersControl.BaseLayer>

                    {/* <LayersControl.BaseLayer name="bing">
                        <TileLayer accessToken={BING_API_KEY} attribution='See https://docs.microsoft.com/en-us/rest/api/maps/render-v2/get-map-tile for details.'
                            url="https://atlas.microsoft.com/map/tile?api-version=2022-08-01&tilesetId=microsoft.imagery&zoom={z}&x={x}&y={y}" />
                    </LayersControl.BaseLayer> */}

                    <LayersControl.BaseLayer name="arcgisonline">
                        <TileLayer attribution='&copy; Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="openstreetmap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                </LayersControl>
                <FullscreenControl />
                {polygons.map((poly, idx) => (
                    <Polygon color='blue' weight={poly.id === selectedFarm ? 2 : 0} fillOpacity={1} eventHandlers={eventHandler} key={idx} positions={poly.coordinates} />
                ))}
            </MapContainer>
        </div>
    );
}

export default MainMap