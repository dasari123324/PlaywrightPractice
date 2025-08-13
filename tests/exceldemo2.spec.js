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
                if(cell.value==='Iphone')
                {
                    console.log(rownumber);
                    console.log(colnumber);
                }
        })
    })

    const cell = await worksheet.getCell(3,2);
    cell.value = "Samsung";

    await workbook.xlsx.writeFile('/Users/priyakasantosh/downloads/download.xlsx');

}

async function excelDemoTest1() // without hardcoding the row and column numbers
{

    let output={row:-1,column:-1};
const workbook=new ExcelJS.Workbook();
await workbook.xlsx.readFile('/Users/priyakasantosh/downloads/download.xlsx');

    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row,rownumber) =>
    {
        row.eachCell((cell,colnumber)=>
            {
                if(cell.value==='Banana')
                {
                    output.row = rownumber;
                    output.column = colnumber;
                }
        })
    })

    const cell = await worksheet.getCell(output.row,output.column);
    cell.value = "Republic";

    await workbook.xlsx.writeFile('/Users/priyakasantosh/downloads/download.xlsx');

}

excelDemoTest()
excelDemoTest1()