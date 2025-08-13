import {test,expect} from '@playwright/test';

test('More Validations of elements',async({page})=>{

await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

// hide and show elements
await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator('#displayed-text').screenshot({path:'element.png'})
await page.screenshot({path:'show.jpg'})
await page.locator('#hide-textbox').click();
await page.screenshot({path:'hide.jpg'})
await expect(page.locator('#displayed-text')).toBeHidden();
await page.pause();

// java popups
page.on('dialog',dialog=>dialog.accept()); // accepts the pop-up
await page.locator('#confirmbtn').click();

//hover
await page.locator('#mousehover').hover();
await page.locator('.mouse-hover-content a').first().click();

// Frame handling
const framepage=page.frameLocator('#courses-iframe');
framepage.locator("a[href*='lifetime-access']:visible").click();
const text=await framepage.locator('.text h2').textContent();
console.log(text.split(" ")[1]);

await page.pause();

});

test.only('Visual testig - Screenshot Comaparision', async({page})=>{
    await page.goto('https://www.flightaware.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});