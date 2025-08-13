const { test, request } = require('@playwright/test');
import { APIUtils } from './Utils/APIUtils';
const payload = { userEmail: "dasarisantosh07@gmail.com", userPassword: "Qwerty@123" };
const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;


test.beforeAll(async () => {
    const apicontext = await request.newContext();
    const apiutils = new APIUtils(apicontext, payload);
    response = await apiutils.createorder(orderpayload);
});

test('Network Call interception test', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    // await page.getByPlaceholder('email@example.com').fill('dasarisantosh07@gmail.com');
    // await page.getByPlaceholder("enter your passsword").fill("Qwerty@123");
    // await page.getByRole('button', { name: 'Login' }).click();
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").first().textContent());

    // Normal Flow = API Response -> Browser -> Front End 
    // Intercepting = API Response -> Playwright fake response -> Browser -> Front End

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    )

    await page.getByText('ORDERS').first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
});