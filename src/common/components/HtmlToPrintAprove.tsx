import React from "react";
import {  PayrollNewsType } from "../../actions/payroll-news/payroll-news.actions";
import { currencyLocale } from "../utils/locale/locale.format.utils";
import { netEarnings, sumNews } from "../utils/tax/index.helpers";
import PrintComponentGeneral from "./PrintComponentGeneral";

const HtmlToPrintApprove = ({ data }: { data: any, }): React.ReactElement => {
  const record = data.payroll_record_detail || []
  
  const registered = new Intl.DateTimeFormat('es-ES', {month: 'long', year: 'numeric'}).format(new Date(data.registered_at))
  // eslint-disable-next-line no-console
  console.log("🚀 ~ file: HtmlToPrintAprove.tsx ~ line 9 ~ HtmlToPrintApprove ~ data", registered)
  let content = `<p><strong>TESORERIA MUNICIPAL: Junta de distrito municipal de Don Juan Rodriguez<br /></strong>Listado de pago de persona <span style="text-decoration: underline;">Administrativo Municipal<br />Mes ${registered}</span></p>
  <br/>
  <h3 style="text-align:center">${data.name || '--'}</h3>

 
  `
  
  record.forEach((item: any) => {
      content += ` 
      
      <table border="0" cellspacing="0" style="border-collapse:collapse; height:108px; width:100%">
        <tbody>
          <tr>
            <td style="height:18px; width:139px"><strong>Codigo:&nbsp;</strong></td>
            <td style="height:18px; width:1051px">${item.employee_id}</td>
          </tr>
          <tr>
            <td style="height:18px; width:139px"><strong>Nombre:&nbsp;</strong></td>
            <td style="height:18px; width:1051px">${item.first_name + ' ' + item.last_name}</td>
          </tr>
          <tr>
            <td style="height:18px; width:139px"><strong>Cedula:</strong></td>
            <td style="height:18px; width:1051px">${item.document_id}</td>
          </tr>
          <tr>
            <td style="height:18px; width:139px"><strong>Depto:</strong></td>
            <td style="height:18px; width:1051px">${item.department || '--'}</td>
          </tr>
          <tr>
            <td style="height:18px; width:139px"><strong>Cargo:</strong></td>
            <td style="height:18px; width:1051px">${item.position_name || '--'}</td>
          </tr>
        
        </tbody>
      </table>
      
      <p>&nbsp;</p>
      
      <table border="0" cellspacing="0" style="border-collapse:collapse; height:144px; width:100%">
        <tbody>
          <tr>
            <td style="height:18px; width:50%">Sueldo:&nbsp;</td>
            <td style="height:18px; width:50%">${currencyLocale(item.salary)}</td>
          </tr>
          <tr>
            <td style="height:18px; width:50%"><strong>Otros Ingresos</strong></td>
            <td style="height:18px; width:50%">&nbsp;</td>
          </tr>
          ${(item.payroll_news_record||[]).filter((item: PayrollNewsType)=> item.operation=='SUMA').reduce(
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
          <tr>
            <td style="height:18px; width:50%">Totales</td>
            <td style="height:18px; width:50%">${currencyLocale( sumNews(item.payroll_news_record, 'SUMA') + item.salary || 0 )}</td>
          </tr>
          <tr>
            <td style="height:18px; width:50%">&nbsp;</td>
            <td style="height:18px; width:50%">&nbsp;</td>
          </tr>
          <tr>
            <td style="height:18px; width:50%"><strong>Descuentos</strong></td>
            <td style="height:18px; width:50%">&nbsp;</td>
          </tr>
          ${(item.payroll_news_record||[]).filter((item: PayrollNewsType)=> item.operation=='RESTA').reduce(
            (prev: string, next: Record<string, string>) => {
              const item = `
            </tr>
          <tr style="height: 18px; "  >
          <td style="width: 50%; height: 18px;   border-right: 1px solid gray; border-bottom: 1px solid gray;padding-rigth: 5px;  text-align: left">${
            next.name
          }</td>
          <td style="width: 50%; height: 18px ;border-bottom: 1px solid gray; text-align: left">${currencyLocale(
            +next.amount || 0
          )}</td>
          </tr>`;
              return prev + item;
            },
            ""
          )}
          <tr style="height: 18px;">
          <td style="width: 50%; height: 18px;">Totals</td>
          <td style="width: 50%; height: 18px; text-align: left">${currencyLocale(
            sumNews(item.payroll_news_record, "RESTA")
          )}</td>
          </tr>
        </tbody>
      </table>
      
      <p>&nbsp;</p>
      
      <p>Sueldo Neto: ${currencyLocale(netEarnings(item, item.payroll_news_record||[])-sumNews(item.payroll_news_record, "RESTA")||0)}</p>
      <hr>

      `;
    });
  content = content + `<div style="box-sizing: content-box; width: 100%;"><table style="width: 100%;" border="0" cellspacing="0" cellpadding="5">
<tbody>
<tr>
<td style=" padding-top: 20px"><hr />
<p style="text-align: center;">Encargado de Nomina</p>
</td>
<td style=" padding-top: 20px"><hr />
<p style="text-align: center; padding: 0px;">Encargado de contabilidad</p>
</td>
<td style=" padding-top: 20px"><hr />
<p style="text-align: center;">Contraloria Municipal</p>
</td>
</tr>
<tr>
<td style=" padding-top: 20px"><hr />
<p style="margin-left: 0px; margin-right: 0px; text-align: center;">Gerente Financiero</p> 
</td>
<td style=" padding-top: 20px"><hr />
<p style="text-align: center;">Tesorero Municipal</p>
</td>
<td style=" padding-top: 20px"><hr />
<p style="text-align: center;">Alcalde Municipal</p>
</td>
</tr>
</tbody>
</table>
</div>
`
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

export default HtmlToPrintApprove;
