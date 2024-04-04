import { useEffect, useState } from "react"
import { SketchPicker } from "react-color";
import { SettingSlider } from "./Components/SettingSlider";
import CustomColorPicker from "./Components/CustomColorPicker";
import { DrawingBoard } from "./Components/DrawingBoard";
import logo from "../public/Logo.svg"
import matic from "../public/Matic.svg"


function App() {

  const [callbackWord, setCallbackWord] = useState("START")

  const [color, setColor] = useState("#FFFFFF")
  const [bgColor, setBgColor] = useState("#000000")
  const [lineColor, setLineColor] = useState("#202020")

  const [drawing, setDrawing] = useState(true)

  const [size, setSize] = useState(10)

  const [gridLines, setGridLines] = useState(true)
  const [mainAxis, setMainAxis] = useState("Horizontal")

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

  useEffect(() => {
    if (callbackWord !== "NONE") setCallbackWord("NONE")
  }, [callbackWord])

  const toggleDrawing = () => {
    setDrawing(!drawing)
    setCallbackWord("DRAWING")
  }

  const toggleMainAxis = () => {
    setMainAxis(mainAxis === "Horizontal" ? "Vertical" : "Horizontal")
    setCallbackWord("AXIS")
  }

  const changeColor = (color) => {
    setColor(color.hex)
    const id = setTimeout(() => {
      setCallbackWord("COLOR")
      clearTimeout(id)
    }, 500)
  }

  const changeBgColor = (color) => {
    setBgColor(color.hex)
    const id = setTimeout(() => {
      setCallbackWord("BGCOLOR")
      clearTimeout(id)
    }, 500)
  }

  const changeLineColor = (color) => {
    setLineColor(color.hex)
    const id = setTimeout(() => {
      setCallbackWord("LINECOLOR")
      clearTimeout(id)
    }, 500)
  }

  const changeGridSize = (value) => {
    setSize(value)
    const id = setTimeout(() => {
      setCallbackWord("SIZE")
      clearTimeout(id)
    }, size === 5 || size === 30 ? 0 : 500)
  }

  const toggleGridLines = () => {
    setGridLines(!gridLines)
    setCallbackWord("GRIDLINES")
  }

  useEffect(() => {
    const onSpace = (e) => {
      if (e.code === "Space") {
        e.preventDefault()
        toggleDrawing()
      }
    }

    window.addEventListener("keydown", onSpace)

    return () => {
      window.removeEventListener("keydown", onSpace)
    }

  }, [drawing])

  useEffect(() => {
    const onG = (e) => {
      if (e.code === "KeyG") {
        toggleGridLines()
      }
    }

    window.addEventListener("keydown", onG)

    return () => {
      window.removeEventListener("keydown", onG)
    }
    
  }, [gridLines])

  useEffect(() => {
     const onR = (e) => {
       if (e.code === "KeyR" && e.ctrlKey === false) setCallbackWord("RESET")
     }

     window.addEventListener("keydown", onR)

     return () => {
       window.removeEventListener("keydown", onR)
     }

  }, [])


  return (
    <>{ width <= 1000 ? 
      <div className="flex h-screen w-full flex-col items-center justify-center p-8 bg-black text-white ">
        <div className="w-full flex justify-center h-8 text-white">
          <img src={logo} className="h-full" alt="Logo" />
          <img src={matic} className="h-full" alt="Logo" />
        </div>
        <p className="p-4 sm:text-lg md:text-2xl tracking-wider font-mono font-semibold">
          Please use a laptop<span className="hidden sm:inline">or a wider screen</span>
        </p>
      </div> :
    <div className="flex h-screen w-full flex-col items-center justify-center p-8 bg-black text-white ">
      <div className="flex w-full h-full gap-4">
      <div className="flex flex-col items-center gap-2 justify-end py-4 font-mono bg-neutral-80">
        <div className="flex flex-col gap-3 w-full">
          <div className="w-full flex justify-center h-8 text-white">
            <img src={logo} className="h-full" alt="Logo" />
            <img src={matic} className="h-full" alt="Logo" />
          </div>
          <SketchPicker className="text-black" width="250px" color={color} onChange={setColor} onChangeComplete={changeColor}/>
          <div className="w-full flex flex-col gap-1">
            <p className="text-xs text-center text-neutral-500">press space to toggle</p> 
            <div className="flex w-full gap-4 text-white">
              <button onClick={toggleDrawing} className={`flex-1 rounded-md ${drawing ? "bg-neutral-700 hover:bg-neutral-600" : "bg-neutral-800 hover:bg-neutral-900"} p-3`}>Pen</button>
              <button onClick={toggleDrawing} className={`flex-1 rounded-md ${drawing ? "bg-neutral-800 hover:bg-neutral-900" : "bg-neutral-700 hover:bg-neutral-600"} p-3`}>Eraser</button>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
            <div className="w-full bg-neutral-900 p-4 rounded-md">
              <label className="inline-flex w-full items-center justify-between cursor-pointer">
                <span className="ms-3 text-lg font-semibold text-gray-900 dark:text-gray-300">Grid Lines [G]</span>
                <input type="checkbox" value="" checked={gridLines} className="sr-only peer" onChange={toggleGridLines} />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          <p className="text-xs text-center text-red-700">These controls need a board reset</p> 
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full bg-neutral-900 rounded-md">
              <SettingSlider label="Grid Size" min={5} max={30} value={size} onUpdate={(value) => changeGridSize(value)}/>
            </div>
            <button onClick={toggleMainAxis} className="w-full bg-neutral-900 p-4 hover:bg-neutral-800 rounded-md" >{`Axis: ${mainAxis}`}</button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 py-4">
        <div className="flex-1 rounded-md flex items-center" >
          <DrawingBoard callbackWord={callbackWord} axis={mainAxis === "Horizontal" ? 0 : 1} color={color} bgColor={bgColor} lineColor={lineColor} isDrawing={drawing} size={size} gridLines={gridLines} />
        </div>
        <div className="flex rounded-md justify-between">
          <div className="flex gap-4">
          <div className="flex gap-4 items-center p-2 px-4 rounded-md bg-neutral-900">
            <p className="hidden xl:block text-sm">Background Color</p>
            <p className="xl:hidden block text-sm">BG</p>
            <div className="w-8 aspect-square">
              <CustomColorPicker color={bgColor} onChange={changeBgColor} />
            </div>
          </div>
          <div className="flex gap-4 items-center p-2 px-4 rounded-md bg-neutral-900">
            <p className="hidden xl:block text-sm">Grid Line Color</p>
            <p className="xl:hidden block text-sm">Lines</p>
            <div className="w-8 aspect-square">
              <CustomColorPicker color={lineColor} onChange={changeLineColor} />
            </div>
          </div>

          </div>
          <div className="flex gap-4">
            <button onClick={() => setCallbackWord("RESET")} className="w-48 xl:w-64 bg-neutral-900 text-white rounded-lg p-2 xl:p-4">Reset Board [R]</button>
            <button onClick={() => setCallbackWord("SAVE")} className="w-48 xl:w-64 bg-neutral-100 text-black rounded-lg p-2 xl:p-4">Save Logo</button>
          </div>
        </div>
      </div>
    </div>


    </div>}
    </>
  )
}

export default App
