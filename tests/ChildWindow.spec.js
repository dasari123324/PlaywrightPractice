import {test,expect,page,browser} from '@playwright/test';

test('Child Window Test',async({browser})=>{

const context=await browser.newContext();
const page=await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const documentlink=page.locator("[href*='documents-request']");

// Promise.all is used to handle multiple promises at a time and it takes an array of promises as input
const [newpage]=await Promise.all(
[context.waitForEvent('page'), // This is used to handle a child window and to be used before the click event
await documentlink.click()]
);

const text= await newpage.locator('.red').textContent();
console.log(text);

const arrayText=await text.split('@');
const domain=await arrayText[1].split(' ');
const email= await domain[0].split('.');
console.log(email[0]);

const username=page.locator("input#username");
await username.fill(email[0]);
await page.pause();
console.log(await username.textContent());  


});
