import { Given,When,Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {POManager} from '../../tests/PageObject/POManager.js';
import playwright from 'playwright';
import { sign } from "crypto";
       
Given('the user is logged in to the eCommerce application with {string} and {string}', async function (email, password) {
    this.poManager = new POManager(this.page);
    const loginpage = this.poManager.getLoginPage();
    await loginpage.goto();
    await loginpage.LoginAction(email,password);        
    });
       
When('the user adds item {string} to the cart', async function (ProductName) {
    const dashboardpage = this.poManager.getDashboardPage();
    await dashboardpage.searchProductName(ProductName);
    await dashboardpage.navigateToCart();
    });
       
Then('Verify {string} is displayed in the cart', async function (Item) {
    const cartpage = this.poManager.getCartPage();
    await cartpage.navigateToCheckout();
    });
       
When('Enter valid details and place the order', async function () {
    const checkoutpage = this.poManager.getCheckoutPage();
    await checkoutpage.checkoutpageactions('Ind',' India');
    const confirmationpage = this.poManager.getConfirmationPage();
    this.orderId = await confirmationpage.confirmationmessagewindow();
    await confirmationpage.myordersnavigation();
    });
       
Then('Verify if the order is present in the order history', async function () {
    const myorderspage = this.poManager.getMyOrdersPage();
    await myorderspage.orderlistcontent(this.orderId);
    await this.page.locator('.tagline').waitFor();
    const orderiddetails=await this.page.locator('.col-text').textContent();
    await expect(this.orderId.includes(orderiddetails)).toBeTruthy();
    }); 

Given('the user is logged in to the eCommerce2 application with {string} and {string}', async function (usr,pwd) {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    this.username=this.page.locator("input#username");
    this.password=this.page.locator("[type='password']");
    this.signinbtn=this.page.locator('.btn.btn-info.btn-md');
    await this.username.fill(usr);
    await this.password.fill(pwd);
    await this.signinbtn.click();
    });

Then('Error Message will be displayed', async function () {
    this.errorblock=this.page.locator("[style*='block']");
    console.log(this.errorblock.textContent());
    await expect(this.errorblock).toContainText('Incorrect');
    });