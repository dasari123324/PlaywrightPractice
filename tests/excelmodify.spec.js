const ExcelJs = require('exceljs')
import {test,expect} from '@playwright/test'

async function writeExcelTest(SearchText, ReplaceText,change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcelTest(worksheet,SearchText);

    const cell = worksheet.getCell(output.row, output.column+change.colchange)
    cell.value = ReplaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcelTest(worksheet, SearchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rownumber) => {
        row.eachCell((cell, columnnumber) => {
            if (cell.value === SearchText) {
                output.row = rownumber;
                output.column = columnnumber;
            }
        })
    })
    return output;
}


test('Excel Test Case',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadpromise = await page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    const download = await downloadpromise;
    const filePath = await download.path();
    await writeExcelTest('Mango',350,{rowchange:0,colchange:2},filePath)
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(filePath);
    await page.pause();
})
