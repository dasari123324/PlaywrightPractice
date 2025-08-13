import {test,context,page,expect} from '@playwright/test';

test("Registering a user", async({browser})=>{

const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/client")

await page.locator("#userEmail").fill("dasarisantosh07@gmail.com");
await page.locator("#userPassword").fill("Qwerty@123");
await page.locator("#login").click();

// This is used to wait for the all the network calls to be made and then execute the next line of code
await page.waitForLoadState('networkidle'); // This is sometimes flaky so below lines of code can be used
// OR 
await page.locator(".card-body b").first().waitFor(); // This can be used when networkidle doesnt work
await page.locator(".card-body b").last().waitFor(); // This works when locator returns only 1 element.

// These 2 lines will return the first element and then validate with the expected text
console.log(await page.locator(".card-body b").first().textContent());
await expect(page.locator(".card-body b").first()).toContainText('ZARA COAT 3');

// This line will return all the elements
console.log(await page.locator(".card-body b").allTextContents());

const productbody=page.locator(".card-body");
const productname='IPHONE 13 PRO';
const productcount=await productbody.count();

for(let i=0;i<productcount;++i)
{
    if(await productbody.locator('b').nth(i).textContent()==productname);
    {
        await productbody.locator('text=Add To Cart').nth(i).click();
        break;
    }

};

const cart=page.locator("[routerlink='/dashboard/cart']");
await cart.click();

await page.waitForLoadState('networkidle');
await page.locator('div li').first().waitFor();
const bool=await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
expect(bool).toBeTruthy();

await page.locator("button[type='button']").last().click();
const drpdwn=page.locator("[placeholder*='Country']");

await drpdwn.pressSequentially('Ind')
const countrylist=page.locator('.ta-results');
await countrylist.waitFor();
const itmlist=countrylist.locator('button');
const itmcount=await itmlist.count();

for(let i=0;i<itmcount;++i)
{
    if(await countrylist.locator('button').nth(i).textContent()===' India')
    {
        await countrylist.locator('button').nth(i).click();
        break;
    }
}
await expect(page.locator(".user__name [type='text']").first()).toHaveText('dasarisantosh07@gmail.com');
await page.locator(".field [type='text']").first().fill('1234567890123456');
await page.locator('select').first().selectOption('03');
await page.locator('select').last().selectOption('29');
await page.locator(".field [type='text']").nth(1).fill('123');
await page.locator(".field [type='text']").nth(2).fill('Santosh Dasari');
await page.locator(".field [type='text']").nth(3).fill('rahulshettyacademy');
await page.locator(".field [type='submit']").click();
await expect(page.locator("[style*='green']")).toContainText('* Coupon Applied');
await page.locator('.action__submit').click();

await page.waitForLoadState('networkidle');
await page.locator('.hero-primary').waitFor();

await expect(page.locator('.hero-primary')).toContainText(' Thankyou for the order. ');
const orderid=await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(orderid);

await page.locator("[routerlink='/dashboard/myorders']").first().click();
await page.locator('.table').waitFor();

const orderscount=await page.locator('.table .ng-star-inserted').count();

for(let i=0;i<orderscount;++i)
{
    const check=await page.locator('.table .ng-star-inserted').nth(i).locator('th').textContent()
    if(orderid.includes(check))
    {
        await page.locator('.table .ng-star-inserted').nth(i).locator('.btn-primary').click();
        break;
    }
}

// const rows=await page.locator('tbody tr');

// for(let i=0;i<await rows.count();++i)
// {
//     const rowOrderID=await rows.nth(i).locator('th').textContent();
//     if(orderid.includes(rowOrderID))
//     {
//         await rows.nth(i).locator('button').first().click();
//         break;
//     }
// }

await page.locator('.tagline').waitFor();
const orderiddetails=await page.locator('.col-text').textContent();
await expect(orderid.includes(orderiddetails)).toBeTruthy();


});