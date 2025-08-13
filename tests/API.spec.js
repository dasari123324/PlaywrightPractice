import { expect,test,request } from "@playwright/test";
const {APIUtils}=require('./Utils/APIUtils');

const payload={userEmail: "dasarisantosh07@gmail.com", userPassword: "Qwerty@123"};
const orderpayload={orders: [{country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]}
let response;

test.beforeAll(async()=>{
    const apicontext=await request.newContext();
    const apiutils = new APIUtils(apicontext,payload);
    response=await apiutils.createorder(orderpayload);
}); 

test('API Testing', async({page})=>{
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    // await page.getByPlaceholder('email@example.com').fill('dasarisantosh07@gmail.com');
    // await page.getByPlaceholder("enter your passsword").fill("Qwerty@123");
    // await page.getByRole('button',{name:'Login'}).click();
    await page.locator(".card-body b").first().waitFor(); 

    console.log(await page.locator(".card-body b").first().textContent());
    await expect(page.locator(".card-body b").first()).toContainText('IPHONE 13 PRO');

    await page.getByText('ORDERS').first().click();
    await page.locator('.table').waitFor();
    const orderscount=await page.locator('.table .ng-star-inserted').count();

    for(let i=0;i<orderscount;++i)
    {
        const check=await page.locator('.table .ng-star-inserted').nth(i).locator('th').textContent()
        if(response.orderId.includes(check))
        {
            await page.locator('.table .ng-star-inserted').nth(i).locator('.btn-primary').click();
            break;
        }
    }
    await page.locator('.tagline').waitFor();
    await page.pause();
    await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();
});