import {test,context,page,expect} from '@playwright/test';

test("Registering a user", async({browser})=>{

const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/client")

await page.getByPlaceholder('email@example.com').fill('dasarisantosh07@gmail.com');
await page.getByPlaceholder("enter your passsword").fill("Qwerty@123");
await page.getByRole('button',{name:'Login'}).click();

// This is used to wait for the all the network calls to be made and then execute the next line of code
await page.waitForLoadState('networkidle'); // This is sometimes flaky so below lines of code can be used
// OR 
await page.locator(".card-body b").first().waitFor(); // This can be used when networkidle doesnt work
await page.locator(".card-body b").last().waitFor(); // This works when locator returns only 1 element.


console.log(await page.locator(".card-body b").first().textContent());
await expect(page.locator(".card-body b").first()).toContainText('IPHONE 13 PRO');


console.log(await page.locator(".card-body b").allTextContents());

const productbody=page.locator(".card-body");
const productname='IPHONE 13 PRO';
await productbody.filter({hasText:productname}).getByRole('button',{name:' Add To Cart'}).click();
await page.locator('li').getByRole('button',{name:'  Cart '}).click();


await page.locator('div li').first().waitFor();

await expect(page.getByText('IPHONE 13 PRO')).toBeVisible();
await page.getByRole('button',{name:'Checkout'}).click();

await page.getByPlaceholder('Select Country').pressSequentially('ind');
await page.getByRole('button',{name:' India'}).nth(1).click();
await page.getByText('PLACE ORDER').click();

// await expect(page.getByLabel('dasarisantosh07@gmail.com')).toBeVisible();
// await page.getByText('4542 9931 9292 2293').clear();
// await page.getByText('4542 9931 9292 2293').fill('1234 5678 9012 3456');
// await page.locator('select').first().selectOption('03');
// await page.locator('select').last().selectOption('29');
// await page.locator(".field [type='text']").nth(1).fill('123');
// await page.locator(".field [type='text']").nth(2).fill('Santosh Dasari');
// await page.locator(".field [type='text']").nth(3).fill('rahulshettyacademy');
// await page.locator(".field [type='submit']").click();
// await expect(page.locator("[style*='green']")).toContainText('* Coupon Applied');
// await page.getByRole('button',{name:'Apply Coupon'}).click();



await page.locator('.hero-primary').waitFor();
await page.getByText(' Thankyou for the order. ').isVisible();
await expect(page.locator('.hero-primary')).toContainText(' Thankyou for the order. ');
const orderid=await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(orderid);


await page.getByText('ORDERS').first().click();
await page.locator('.table').waitFor();
await page.locator('tr').filter({hasText:'6790ffc4e2b5443b1f30a65e'}).getByRole('button',{name:'View'}).click();

await page.locator('.tagline').waitFor();
await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();


});