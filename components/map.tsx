'use client'
import { getRandomColorRGB, parseCoordinates } from '@/utils/utils'
import { useWindowSize } from "@uidotdev/usehooks";
import { LeafletMouseEvent, LatLngLiteral, LatLngExpression, LeafletEventHandlerFnMap, LeafletMouseEventHandlerFn, latLngBounds, LatLngBounds } from 'leaflet'
import { RefAttributes, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, LayersControl, Polygon, FeatureGroup, useMapEvents, useMap } from 'react-leaflet'
import { FullscreenControl } from "react-leaflet-fullscreen";
import { kmls } from '@/data/kmls';
import "react-leaflet-fullscreen/styles.css";
import { PolyObj } from '@/types/data';
import Button from './ui/button';
import MapElements from './map-elements';

type Props = {
    trigger: number
    changeBtn: (color: string) => void
}

const MainMap = ({ changeBtn, trigger }: Props) => {
    const { width } = useWindowSize()
    const [selectedFarm, setSelectedFarm] = useState<number>(1)
    const [mapBounds, setMapBounds] = useState<LatLngBounds>()

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

    return (
        <div id="map">
            <MapContainer scrollWheelZoom
                bounds={mapBounds}
                zoom={8}
                center={[8.1906335, -80.9194565]}
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
                <MapElements changeBtn={changeBtn} polygons={polygons} selectedFarm={selectedFarm} />
            </MapContainer>
        </div>
    );
}

export default MainMap