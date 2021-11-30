/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CustomButton, CustomRow, CustomSpace } from '.'
import CustomCol from './CustomCol'

type CanvasProps = {
  width?: number
  height?: number
}

type Coordinate = {
  x: number
  y: number
}
const CanvaSignature = ({
  width = 500,
  height = 300,
}: CanvasProps): React.ReactElement => {
  const [isPainting, setIsPainting] = useState(false)
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  )
  const canvasRef:
    | string
    | ((instance: HTMLCanvasElement | null) => void)
    | RefObject<HTMLCanvasElement>
    | null
    | (undefined & any) = useRef()

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    }
  }

  //START POINT
  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event)
    if (coordinates) {
      setIsPainting(true)
      setMousePosition(coordinates)
    }
  }, [])
  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    canvas.addEventListener('mousedown', startPaint)
    return () => {
      canvas.removeEventListener('mousedown', startPaint)
    }
  }, [startPaint])

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    const context = canvas.getContext('2d')
    if (context) {
      context.strokeStyle = 'black'
      context.lineJoin = 'round'
      context.lineWidth = 1

      context.beginPath()
      context.moveTo(originalMousePosition.x, originalMousePosition.y)
      context.lineTo(newMousePosition.x, newMousePosition.y)
      context.closePath()
      context.stroke()
    }
  }

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event)
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition)
          setMousePosition(newMousePosition)
        }
      }
    },
    [isPainting, mousePosition]
  )

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    canvas.addEventListener('mousemove', paint)
    return () => {
      canvas.removeEventListener('mousemove', paint)
    }
  }, [paint])

  const exitPaint = useCallback(() => {
    setIsPainting(false)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    canvas.addEventListener('mouseup', exitPaint)
    canvas.addEventListener('mouseleave', exitPaint)
    return () => {
      canvas.removeEventListener('mouseup', exitPaint)
      canvas.removeEventListener('mouseleave', exitPaint)
    }
  }, [exitPaint])

  const saveSignature = () => {
    const canvas: HTMLCanvasElement = canvasRef.current
    const context = canvas.getContext('2d')
    if (context) {
      const src = canvas.toDataURL('image/png')
      // eslint-disable-next-line no-console
      console.log(src)
    }
  }

  const clearCanva = () => {
    const canvas: HTMLCanvasElement = canvasRef.current
    const context = canvas.getContext('2d')
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  return (
    <CustomRow gutter={[0, 8]} justify={'start'}>
      <canvas
        style={{
          border: '2px dotted #CCCCCC',
          borderRadius: '15px',
          cursor: 'crosshair',
          backgroundColor: 'white',
        }}
        ref={canvasRef}
        height={height}
        width={width}
      />
      <CustomCol xs={22}>
        <CustomSpace>
          <CustomButton
            style={{ marginLeft: '5px' }}
            type={'primary'}
            onClick={saveSignature}
          >
            Guardar Firma
          </CustomButton>
          <CustomButton type={'primary'} onClick={clearCanva} danger>
            Limpiar Firma
          </CustomButton>
        </CustomSpace>
      </CustomCol>
    </CustomRow>
  )
}
export default CanvaSignature
