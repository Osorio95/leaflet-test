import { PolyObj } from '@/types/data'
import { LatLngExpression, LeafletEventHandlerFnMap, LeafletMouseEvent, latLngBounds } from 'leaflet'
import React from 'react'
import { FeatureGroup, Polygon, useMap } from 'react-leaflet'

type Props = {
    polygons: PolyObj[]
    selectedFarm: number
    changeBtn: (color: string) => void
}

const MapElements = ({ polygons, selectedFarm, changeBtn }: Props) => {
    const map = useMap()

    const eventHandler: LeafletEventHandlerFnMap = {
        click: (e: LeafletMouseEvent) => {
            changeBtn(e.target)
            map.flyToBounds(e.target["_bounds"])
        },
        contextmenu: (e) => {
            fitMapToBounds()
        }
    }

    const fitMapToBounds = () => {
        const allBounds = polygons.map((poly) => poly.coordinates)
        const bounds = latLngBounds(allBounds.reduce((acc, polygon) => acc.concat(polygon)));
        map.flyToBounds(bounds)
    };

    return (
        <FeatureGroup>
            {polygons.map((poly, idx) => (
                <Polygon
                    key={idx}
                    color='skyblue'
                    weight={poly.id === selectedFarm ? 2 : 0}
                    fillOpacity={0.5}
                    eventHandlers={eventHandler}
                    positions={poly.coordinates} />
            ))}
        </FeatureGroup>
    )
}

export default MapElements