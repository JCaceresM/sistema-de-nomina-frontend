/* eslint-disable no-console */
import { Divider } from 'antd'
import * as React from 'react'
import { useReactToPrint } from 'react-to-print'
import CustomButton from './CustomButton'
import CustomLayoutBoxShadow from './CustomLayoutBoxShadow'

// eslint-disable-next-line @typescript-eslint/ban-types
const PrintComponentGeneral: React.FC<{}> = ({ children }) => {
  const componentRef = React.useRef(null)
  const onBeforeGetContentResolve = React.useRef<(() => void) | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(false)
  const [text, setText] = React.useState('old boring text')

  const handleAfterPrint = React.useCallback(() => {
    console.log('`onAfterPrint` called') // tslint:disable-line no-console
  }, [])

  const handleBeforePrint = React.useCallback(() => {
    setLoading(true)
    console.log('`onBeforePrint` called') // tslint:disable-line no-console
  }, [])

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log('`onBeforeGetContent` called') // tslint:disable-line no-console
    setText('Loading new text...')

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve

      setTimeout(() => {
        setLoading(false)
        setText('New, Updated Text!')
        resolve()
      }, 2000)
    })
  }, [setLoading, setText])

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: 'AwesomeFileName',
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  })

  React.useEffect(() => {
    if (
      text === 'New, Updated Text!' &&
      typeof onBeforeGetContentResolve.current === 'function'
    ) {
      onBeforeGetContentResolve.current()
    }
  }, [onBeforeGetContentResolve.current, text])

  return (
    <CustomLayoutBoxShadow>
      <div
        style={{
          height: 650,
          paddingTop: 0,
        }}
      >
        <Divider style={{ marginBottom: 10 }} />
        <h1>qlq miop</h1>
        <Divider style={{ marginBottom: 10 }} />
        <div ref={componentRef}>{children}</div>

        <CustomButton onClick={handlePrint}>Imprimir</CustomButton>
      </div>
    </CustomLayoutBoxShadow>
  )
}
export default PrintComponentGeneral
