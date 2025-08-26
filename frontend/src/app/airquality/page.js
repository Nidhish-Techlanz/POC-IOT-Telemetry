import HumidityGraph from "../../components/AirQuality/HumidityGraph"
import PMTen from "../../components/AirQuality/PMTen"
import PMTwo from "../../components/AirQuality/PMTwo"
import VOCGraph from "../../components/AirQuality/VOCGraph"

function AirQuality() {
  return (
    <div>
        <HumidityGraph/>
        <PMTen/>
        <PMTwo/>
        <VOCGraph/> 
    </div>
  )
}

export default AirQuality