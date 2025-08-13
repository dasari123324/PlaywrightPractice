import {test,expect} from '@playwright/test';

test('UI Controls Test', async({browser})=>{

const context=await browser.newContext();
const page=await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

const username=page.locator("input#username");
const password=page.locator("[type='password']");
const signinbtn=page.locator('.btn.btn-info.btn-md');
const selectdrpdwn=page.locator('select.form-control');
const radiobtn=page.locator('.radiotextsty').nth(1);
const okpopupCTA=page.locator('#okayBtn');
const terms=page.locator('#terms');
const documentlink=page.locator("[href*='documents-request']");

await username.fill("rahulshettyacademy");
await password.fill("learning");

// Radio Buttons
await radiobtn.check();
await okpopupCTA.click();
// the below lines of code is used to check if the Radio Button is selected 
await expect(radiobtn).toBeChecked();
console.log(await radiobtn.isChecked());

// This is used to handle the dropdowns which already have predefined options.
await selectdrpdwn.selectOption('consult');

// checkboxes - click the checkbox and asserts the checkbox status.
await terms.click();
await expect(terms).toBeChecked();
await terms.uncheck();
await expect(terms).not.toBeChecked();
expect(await terms.isChecked()).toBeFalsy();
 
// Check the attribute value of the element
await expect(documentlink).toHaveAttribute('class','blinkingText');

// This is used to pause the webpage after the dropdown is selected
await page.pause();

});