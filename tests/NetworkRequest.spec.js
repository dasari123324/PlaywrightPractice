import {test,request,expect} from '@playwright/test'

test('Network Request Intercepting test', async({page})=>{

        await page.goto('https://rahulshettyacademy.com/client/');
        console.log(await page.title());
        await page.getByPlaceholder('email@example.com').fill('dasarisantosh07@gmail.com');
        await page.getByPlaceholder("enter your passsword").fill("Qwerty@123");
        await page.getByRole('button',{name:'Login'}).click();
        await page.locator(".card-body b").last().waitFor(); 

        await page.locator("button[routerlink$='/dashboard/myorders']").click();


        await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
            route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6795aa56e2b5443b1f123456'})
        );

        await page.locator("button:has-text('View')").first().click();
        await page.pause();
})