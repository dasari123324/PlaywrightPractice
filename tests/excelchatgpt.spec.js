const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // Use first sheet if unsure of name

    const output = await readExcel(worksheet, searchText);
    if (output.row === -1 || output.column === -1) {
        console.log(`"${searchText}" not found in Excel.`);
        return;
    }

    
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = { row: rowNumber, column: colNumber };
            }
        });
    });
    return output;
}

test('Upload download Excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    // Wait for download event
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    // Get downloaded file path dynamically
    const filePath = await download.path();
    console.log(`Downloaded file path: ${filePath}`);

    if (!filePath) {
        console.error("File was not downloaded.");
        return;
    }

    // Modify Excel file
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

    // Upload modified file
    await page.locator("#fileinput").setInputFiles(filePath);

    await page.pause();

    // Verify the update in the uploaded file
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});
