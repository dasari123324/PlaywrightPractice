import { expect,test,request } from "@playwright/test";

const payload={userEmail: "dasarisantosh07@gmail.com", userPassword: "Qwerty@123"};
let token;

test.beforeAll(async()=>{
    const apicontext=await request.newContext();
    const loadapi=await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:payload
        })
        const loginresponsejson=await loadapi.json();
        const token=loginresponsejson.token;
        console.log(token);
}); 

test('API Testing', async({page})=>{
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },token);

    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    // await page.getByPlaceholder('email@example.com').fill('dasarisantosh07@gmail.com');
    // await page.getByPlaceholder("enter your passsword").fill("Qwerty@123");
    // await page.getByRole('button',{name:'Login'}).click();
    
    await page.waitForLoadState('networkidle'); 
    await page.locator(".card-body b").first().waitFor(); 
    await page.locator(".card-body b").last().waitFor(); 

    console.log(await page.locator(".card-body b").first().textContent());
    await expect(page.locator(".card-body b").first()).toContainText('IPHONE 13 PRO');

});