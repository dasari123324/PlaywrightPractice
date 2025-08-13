import {test,expect} from '@playwright/test';
const {LoginPage} = require ('./PageObject/LoginPage');
const {DashboardPage} = require ('./PageObject/DashboardPage');
const {CartPage} = require ('./PageObject/CartPage');
const {CheckoutPage} = require ('./PageObject/CheckoutPage');
const {ConfirmationPage} = require('./PageObject/ConfirmationPage');
const {MyOrdersPage} = require('./PageObject/MyOrdersPage');

test("Registering a user", async({browser})=>{

const context=await browser.newContext();
const page=await context.newPage();
const email = 'dasarisantosh07@gmail.com';
const password = 'Qwerty@123';
const ProductName = 'IPHONE 13 PRO';

const loginpage = new LoginPage(page);
await loginpage.goto();
await loginpage.LoginAction(email,password);

const dashboardpage = new DashboardPage(page);
await dashboardpage.searchProductName(ProductName);
await dashboardpage.navigateToCart();
const cartpage = new CartPage(page)
cartpage.navigateToCheckout();

const checkoutpage = new CheckoutPage(page);
checkoutpage.checkoutpageactions('Ind',' India');

const confirmationpage = new ConfirmationPage(page);
const orderId = await confirmationpage.confirmationmessagewindow();
await confirmationpage.myordersnavigation();

const myorderspage = new MyOrdersPage(page);
await myorderspage.orderlistcontent(orderId);

await page.locator('.tagline').waitFor();
const orderiddetails=await page.locator('.col-text').textContent();
await expect(orderId.includes(orderiddetails)).toBeTruthy();


});