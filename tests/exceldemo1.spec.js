const ExcelJS = require('exceljs');


async function excelDemoTest()
{
const workbook=new ExcelJS.Workbook();
await workbook.xlsx.readFile('/Users/priyakasantosh/downloads/download.xlsx');

    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row,rownumber) =>
    {
        row.eachCell((cell,colnumber)=>
            {
                console.log(cell.value);
        })
    })
}

excelDemoTest()