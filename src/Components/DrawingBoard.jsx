import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from "./sketch";
import { useEffect, useState } from "react";

export const DrawingBoard = ({callbackWord, size, axis, bgColor, lineColor, color, isDrawing, gridLines}) => {

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  
  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    })
  }, [])

  return (
    <ReactP5Wrapper
      sketch={sketch}
      callbackWord={callbackWord}
      w={width-400}
      h={height-200}
      nodeSize={size}
      mainAxis={axis}
      BGColor={bgColor}
      LineColor={lineColor}
      drawColor={color}
      isDrawing={isDrawing}
      showGrid={gridLines}
    />
  )
}
