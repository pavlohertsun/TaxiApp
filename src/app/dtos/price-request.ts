export interface PriceRequest{
  startAddress: {
    lat: number,
    lng: number
  },
  endAddress: {
    lat: number,
    lng: number
  },
  rate: string
}
