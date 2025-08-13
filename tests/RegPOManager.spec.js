import {test,expect} from '@playwright/test';
import {POManager} from './PageObject/POManager';

test("E2E flow of purchasing an item using PO Manager", async({browser})=>{

const context=await browser.newContext();
const page=await context.newPage();
const email = 'dasarisantosh07@gmail.com';
const password = 'Qwerty@123';
const ProductName = 'IPHONE 13 PRO';

const poManager = new POManager(page);
const loginpage = poManager.getLoginPage();
await loginpage.goto();
await loginpage.LoginAction(email,password);

const dashboardpage = poManager.getDashboardPage();
await dashboardpage.searchProductName(ProductName);
await dashboardpage.navigateToCart();
const cartpage = poManager.getCartPage();
await cartpage.navigateToCheckout();

const checkoutpage = poManager.getCheckoutPage();
await checkoutpage.checkoutpageactions('Ind',' India');

const confirmationpage = poManager.getConfirmationPage();
const orderId = await confirmationpage.confirmationmessagewindow();
await confirmationpage.myordersnavigation();

const myorderspage = poManager.getMyOrdersPage();
await myorderspage.orderlistcontent(orderId);

await page.locator('.tagline').waitFor();
const orderiddetails=await page.locator('.col-text').textContent();
await expect(orderId.includes(orderiddetails)).toBeTruthy();


});