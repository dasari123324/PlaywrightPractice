import {test,expect} from '@playwright/test';

test('Calender handling test',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    const date='12';
    const month='1';
    const year='2025';
    const expectedlist=[month,date,year];

    await page.locator('.react-date-picker').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__tile').nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const values=await page.locator('.react-date-picker__inputGroup input');

    for(let i=0;i<values.length;i++)
    {
        const value=values.nth(i).getAttribute("value");
        expect(value).toEqual(expectedlist[i]);
        console.log(value);

    }

    await page.pause();
})