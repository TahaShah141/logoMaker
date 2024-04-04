export const sketch = (p5) => {
  
  const sqrt3 = Math.sqrt(3)
  
  let bgColor = "#000000"
  let lineColor = "#1D1D1D"
  let color = "#FFFFFF"

  let r = 10 //size
  let p = 0
  let nX = 10
  let nY = 7
  let axis = 1

  let Nodes = []
  let dragging = false
  let drawing = true
  let gridLines = true
  let lastHovered;

  let WIDTH = 1200;
  let HEIGHT = 600;

  function Node(x, y, orientation, color) {
    this.x = x
    this.y = y
    this.orientation = orientation
    this.colored = false
    this.color = color

    this.show = () => {
      if (this.colored) {
        p5.fill(this.color)
        p5.stroke(this.color)
      } else {
        p5.fill(bgColor)
        p5.stroke(lineColor)
      }

      if (axis === 1) {
        const sign = (this.orientation % 2 === 1) ? 1 : -1
        p5.triangle(this.x-sign*r*2, this.y, this.x+sign*r, this.y+r*sqrt3, this.x+sign*r, this.y-r*sqrt3)
      } else {
        const sign = (this.orientation % 2 === 0) ? 1 : -1
        p5.triangle(this.x, this.y-sign*r*2, this.x+r*sqrt3, this.y+sign*r, this.x-r*sqrt3, this.y+sign*r)
      }
    }

    this.hover = () => {

      if (axis === 0) {
        const sign = (this.orientation % 2 === 0) ? 1 : -1
        const y = p5.mouseY - this.y
        const x = p5.mouseX - this.x

        const y1 = sign * r
        const y2 = sign*sqrt3*x - sign*2*r
        const y3 = -sign*sqrt3*x - sign*2*r

        const y1Bool = sign * y <= sign * y1
        const y2Bool = sign * y >= sign * y2
        const y3Bool = sign * y >= sign * y3

        return y1Bool && y2Bool && y3Bool
      } else if (this.orientation === 0) {
        const y = p5.mouseY - this.y
        const x = p5.mouseX - this.x

        const x1 = -r
        const y1 = x/sqrt3 - r*2/sqrt3
        const y2 = -x/sqrt3 + r*2/sqrt3      

        const x1Bool = x >= x1
        const y1Bool = y >= y1
        const y2Bool = y <= y2

        return x1Bool && y1Bool && y2Bool
      } else {
        const y = p5.mouseY - this.y
        const x = p5.mouseX - this.x

        const x1 = r
        const y1 = -x/sqrt3 - r*2/sqrt3
        const y2 = x/sqrt3 + r*2/sqrt3      

        const x1Bool = x <= x1
        const y1Bool = y >= y1
        const y2Bool = y <= y2

        return x1Bool && y1Bool && y2Bool
      }
    }
  }

  const rerender = () => {

    if (Nodes.length === 0) return;
    p5.background(bgColor)

    for (const n of Nodes) {
      if (gridLines || n.colored) n.show()
    }
  }

  const initNodes = () => {
    Nodes = []
    const step = r*sqrt3

    console.log(sqrt3)
  
    for (let x = 0; x < 2*nX; x++) {
      for (let y = 0; y < 2*nY; y++) {
        
        let cx, cy;
        
        if (axis === 0) {
          cx = p + x*step
          cy = p + 2*r*y + (x%2)*r
          
          if (!((x%2 === 0 && y%3 === 0) || (x%2 === 1 && y%3 === 1)))
          Nodes.push(new Node(cx, cy, ((x%2 === 1 && y%3 === 2) || (x%2 === 0 && y%3 === 1)) ? 0 : 1, color))
        } else {
          cy = p + y*step
          cx = p + 2*r*x + (y%2)*r
          
          if (!((y%2 === 0 && x%3 === 0) || (y%2 === 1 && x%3 === 1)))
          Nodes.push(new Node(cx, cy, ((y%2 === 1 && x%3 === 2) || (y%2 === 0 && x%3 === 1)) ? 1 : 0, color))
        }  
      }
    }
  }

  p5.updateWithProps = ({callbackWord, nodeSize, mainAxis, BGColor, LineColor, drawColor, isDrawing, showGrid, w=1300, h=650}) => {

    switch (callbackWord) {

      case "START": {
        drawing = isDrawing
        gridLines = showGrid
        bgColor = BGColor
        lineColor = LineColor
        color = drawColor
        axis = mainAxis
        r = nodeSize
        resizeBoard()
        initNodes()
        rerender()
        break;
      }

      case "SAVE": {
        let name = prompt("Name your Design:")
        if (name !== null && name !== '') p5.saveCanvas(name, 'png')
        break;
      }

      case "RESET": {
        p5.background(bgColor)
        for (const n of Nodes) {
          n.colored = false
          n.show()
        }
        break;
      }

      case "DRAWING": {
        drawing = isDrawing
        break;
      }

      case "COLOR": {
        color = drawColor
        break;
      }

      case "GRIDLINES": {
        gridLines = showGrid
        rerender()
        break;
      }

      case "BGCOLOR": {
        bgColor = BGColor
        rerender()
        break;
      }

      case "LINECOLOR": {
        lineColor = LineColor
        rerender()
        break;
      }

      case "AXIS": {
        axis = mainAxis
        initNodes()
        rerender()
        break;
      }

      case "SIZE": {
        r = nodeSize
        resizeBoard()
        break;
      }
    }

    let changedSize = false
    if (w !== WIDTH) {
      WIDTH = w
      changedSize = true
    }
    if (h !== HEIGHT) {
      HEIGHT = h
      changedSize = true
    }

    if (changedSize) return p5.setup()

  }


  const resizeBoard = () => {
    p = -p5.width/20
    console.log(p5.width, p, r)
    nX = p5.int((p5.width-2*p)/(2*r))
    nY = p5.int((p5.height-2*p)/(2*r))

    initNodes()
    rerender()
  }

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    p5.background(bgColor);

    resizeBoard()
  }

  p5.mousePressed = () => {
    dragging = true
  }

  p5.mouseReleased = () => {
    dragging = false
  }

  p5.draw = () => {
    // p5.fill(color)
    // p5.rect(p5.mouseX, p5.mouseY, 10, 10)
    
    if (!dragging) return;

    const hovered = Nodes.find(node => node.hover())
    if (!hovered) return;

    hovered.color = color
    hovered.colored = drawing
    hovered.show()
    if (lastHovered !== hovered) {
      lastHovered = hovered
    }
  }
}