import Autoplay from "embla-carousel-autoplay"
import * as React from "react"

import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious
} from "../ui/carousel"

interface MainCarouselProps {
  dummyData: string[];
}


export const MainCarousel = ({dummyData}:MainCarouselProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
 
  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {/* 이미지 리스트 넣기 */}
          {dummyData.map((imgdata, index) => (
            <CarouselItem key={index}>
                <Card>
                  <CardContent>
                  <a href={index === 0 ? '/board' : index === 1 ? '/schedule' : '/contractlist'}>
                      <img className="w-full h-full object-cover" src={imgdata} alt="제품 상세 이미지" />
                  </a>
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    </>
  )
}
