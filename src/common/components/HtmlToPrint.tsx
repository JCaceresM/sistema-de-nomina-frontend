import React from 'react'
import PrintComponentGeneral from './PrintComponentGeneral'

const content = `<h2 style="text-align: center; margin-top: 200px;">Recibo</h2>
<table style="width: 55.3977%; border-collapse: collapse; height: 72px;" border="0">
<tbody>
<tr style="height: 18px;">
<td style="width: 18.5024%; height: 18px;">No. Recibo:</td>
<td style="width: 36.8953%; height: 18px;">00001</td>
</tr>
<tr style="height: 18px;">
<td style="width: 18.5024%; height: 18px;">Cliente:&nbsp;</td>
<td style="width: 36.8953%; height: 18px;">Juan Perez</td>
</tr> 
<tr style="height: 18px;">
<td style="width: 18.5024%; height: 18px;">Referencia:</td>
<td style="width: 36.8953%; height: 18px;">ALKS0565S</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>`

const HtmlToPrint = (): React.ReactElement => {
  return (
    <PrintComponentGeneral>
      <div
        style={{ width: '5cm' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PrintComponentGeneral>
  )
}

export default HtmlToPrint
