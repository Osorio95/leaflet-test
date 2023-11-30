import { LatLngExpression } from "leaflet"

export type DateData = {
    date: string
    ndvi: number
}

export  type PolyObj = {
    id: number
    name: string
    value: number | null
    coordinates: LatLngExpression[]
}