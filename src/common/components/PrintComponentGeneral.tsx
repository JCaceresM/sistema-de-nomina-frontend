/* eslint-disable no-console */
import * as React from "react";
import { useReactToPrint } from "react-to-print";
import CustomButton from "./CustomButton";
import CustomDivider from "./CustomDivider";
import CustomSpin from "./CustomSpin";

// eslint-disable-next-line @typescript-eslint/ban-types
const PrintComponentGeneral: React.FC<{}> = ({ children }) => {
  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef<(() => void) | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
    setLoading(false)
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    setLoading(true);
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setText("Loading new text...");

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Ayuntamiento",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
    pageStyle: 'margin: 25mm 25mm 25mm 24mm; font-size: 14px    ',
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  return (
    <CustomSpin spinning={loading}
     
    >
       
      <CustomButton onClick={handlePrint}>Imprimir</CustomButton>
      <CustomDivider></CustomDivider>
      <div
      
      ref={componentRef}>{children}</div>
     
    </CustomSpin>
  );
};
export default PrintComponentGeneral;
