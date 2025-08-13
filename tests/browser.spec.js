import {expect, test,browser,Browser} from '@playwright/test';
// (or) const {test} = require('@playwright/test'); 

test('Browser Context Playwright test', async({browser})=>{
    // this step is to open a new browser context and a new page with any user defined cookies or plugins
    // adding cookies or plugins is optional and can be done using context.addCookies() or context.addInitScript()
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
});

test('Page Playwright test', async({page})=>{
// if we want to open a default browser context without any plugins - we can use page object in test function.
// if page object is used - we can skip the context and page initialization steps and directly use goto() method 
    await page.goto('https://google.com'); 
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('Run only this Playwright test', async({page})=>{
// test.only can be used to run only this test case and skip all other test cases
        await page.goto('https://facebook.com'); 
        console.log(await page.title());
        await expect(page).toHaveTitle('Facebook – log in or sign up');
    });

