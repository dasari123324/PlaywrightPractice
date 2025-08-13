const {test,expect,request} = require('@playwright/test');
const path = require('path');
let webcontext;

test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    await page.getByPlaceholder('email@example.com').fill('dasarisantosh07@gmail.com');
    await page.getByPlaceholder("enter your passsword").fill("Qwerty@123");
    await page.getByRole('button',{name:'Login'}).click();
    await page.waitForLoadState('networkidle'); 
    await context.storageState({path:'state.json'});
    webcontext = await browser.newContext({storageState:'state.json'})
});

test('API Testing', async()=>{

    const page=await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    

    await page.locator(".card-body b").first().waitFor(); 
    console.log(await page.locator(".card-body b").first().textContent());
    await expect(page.locator(".card-body b").first()).toContainText('IPHONE 13 PRO');

});
