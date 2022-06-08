import React from "react";
import { currencyLocale } from "../utils/locale/locale.format.utils";
import { netEarnings, sumNews } from "../utils/tax/index.helpers";
import PrintComponentGeneral from "./PrintComponentGeneral";

const HtmlToPrint = ({ data }: { data: any }): React.ReactElement => {
  const isArray = Array.isArray(data);
  let content = "";
  if (isArray) {
    data.forEach((item) => {
      content += `<h3 style="text-align: center;"><strong>Recibo de pago</strong></h3>
      <table style="height: 141px; width: 100%; border-collapse: collapse;" border="0">
      <tbody>
      <tr style="height: 183px;">
      <td style="width: 50%; height: 141px; text-align: justify; vertical-align: top;">
      <table style="height: 108px; width: 100%; border-collapse: collapse;" border="0">
      <tbody>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;"><strong>Codigo:&nbsp;</strong></td>
      <td style="width: 50%; height: 18px;">${item.employee_id}</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;"><strong>Nombre:&nbsp;</strong></td>
      <td style="width: 50%; height: 18px;">${
        item.first_name + " " + item.last_name
      }</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;"><strong>Cedula:</strong></td>
      <td style="width: 50%; height: 18px;">${item.document_id}</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;"><strong>Depto:</strong></td>
      <td style="width: 50%; height: 18px;">${item.department || '--'}</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;"><strong>Cargo:</strong></td>
      <td style="width: 50%; height: 18px;">${item.position_name || "--"}</td>
   
      </tbody>
      </table>
      <p>&nbsp;</p>
      <p style="text-align: center;">______________________________________</p>
      <p style="text-align: center;">Recibido por:</p>
      </td>
      <td style="width: 50%; height: 141px; text-align: justify; vertical-align: top;">
      <table style="width: 100%; border-collapse: collapse; height: 144px;" border="0">
      <tbody>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;">Sueldo:&nbsp;</td>
      <td style="width: 50%; height: 18px;">${currencyLocale(item.salary)}</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;">Otros Ingresos</td>
      <td style="width: 50%; height: 18px;">${currencyLocale(
        sumNews(item.payroll_news_record, "SUMA")
      )}</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;">Totales</td>
      <td style="width: 50%; height: 18px;">${currencyLocale(
        sumNews(item.payroll_news_record, "SUMA") + item.salary || 0
      )}</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;">&nbsp;</td>
      <td style="width: 50%; height: 18px;">&nbsp;</td>
      </tr>
      <tr style="height: 18px;">
      <td style="width: 50%; height: 18px;"><strong>Descuentos</strong></td>
      <td style="width: 50%; height: 18px;">&nbsp;</td>
      ${(item.payroll_news_record||[]).reduce(
        (prev: string, next: Record<string, string>) => {
          const item = `
        </tr>
      <tr style="height: 18px; "  >
      <td style="width: 50%; height: 18px;   border-right: 1px solid gray; border-bottom: 1px solid gray;padding-rigth: 5px;  text-align: left">${
        next.name
      }</td>
      <td style="width: 50%; height: 18px ;border-bottom: 1px solid gray; text-align: center">${currencyLocale(
        +next.amount || 0
      )}</td>
      </tr>`;
          return prev + item;
        },
        ""
      )}
      
      
      </tbody>
      </table>
      <p>Sueldo Neto: ${currencyLocale(netEarnings(item, []))}</p>
      </td>
      </tr>
      </tbody>
      </table>
      <p style="text-align: left;">&nbsp;</p>`;
    });
  } else {
    content = `<h3 style="text-align: center;"><strong>Recibo de pago</strong></h3>
<table style="height: 141px; width: 100%; border-collapse: collapse;" border="0">
<tbody>
<tr style="height: 183px;">
<td style="width: 50%; height: 141px; text-align: justify; vertical-align: top;">
<table style="height: 108px; width: 100%; border-collapse: collapse;" border="0">
<tbody>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;"><strong>Codigo:&nbsp;</strong></td>
<td style="width: 50%; height: 18px;">${data.employee_id}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;"><strong>Nombre:&nbsp;</strong></td>
<td style="width: 50%; height: 18px;">${
      data.first_name + " " + data.last_name
    }</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;"><strong>Cedula:</strong></td>
<td style="width: 50%; height: 18px;">${data.document_id}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;"><strong>Depto:</strong></td>
<td style="width: 50%; height: 18px;">${data.department || '--'}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;"><strong>Cargo:</strong></td>
<td style="width: 50%; height: 18px;">${data.position_name || "--"}</td>
</tr>

</tbody>
</table>
<p>&nbsp;</p>
<p style="text-align: center;">______________________________________</p>
<p style="text-align: center;">Recibido por:</p>
</td>
<td style="width: 50%; height: 141px; text-align: justify; vertical-align: top;">
<table style="width: 100%; border-collapse: collapse; height: 144px;" border="0">
<tbody>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">Sueldo:&nbsp;</td>
<td style="width: 50%; height: 18px;">${currencyLocale(data.salary)}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">Otros Ingresos</td>
<td style="width: 50%; height: 18px;">${currencyLocale(
      sumNews(data.payroll_news_record, "SUMA")
    )}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">Totales</td>
<td style="width: 50%; height: 18px;">${currencyLocale(
      sumNews(data.payroll_news_record, "SUMA") + data.salary || 0
    )}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">&nbsp;</td>
<td style="width: 50%; height: 18px;">&nbsp;</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;"><strong>Descuentos</strong></td>
<td style="width: 50%; height: 18px;">&nbsp;</td>
${data.payroll_news_record.reduce(
  (prev: string, next: Record<string, string>) => {
    const item = `
  </tr>
<tr style="height: 18px; "  >
<td style="width: 50%; height: 18px;   border-right: 1px solid gray; border-bottom: 1px solid gray;padding-rigth: 5px;  text-align: left">${
      next.name
    }</td>
<td style="width: 50%; height: 18px ;border-bottom: 1px solid gray; text-align: center">${currencyLocale(
      +next.amount || 0
    )}</td>
</tr>`;
    return prev + item;
  },
  ""
)}


</tbody>
</table>
<p>Sueldo Neto: ${currencyLocale(netEarnings(data, []))}</p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: left;">&nbsp;</p>`;
  }
// eslint-disable-next-line no-console
console.log(data);

  return (
    <PrintComponentGeneral>
      <div
        // style={{  textAlign: 'center' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PrintComponentGeneral>
  );
};

export default HtmlToPrint;
