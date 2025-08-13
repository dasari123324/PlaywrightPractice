import {LoginPage} from './LoginPage.js';
import {DashboardPage} from './DashboardPage.js';
import {CartPage} from './CartPage.js';
import {CheckoutPage} from './CheckoutPage.js';
import {ConfirmationPage} from './ConfirmationPage.js';
import {MyOrdersPage} from './MyOrdersPage.js';

export class POManager{
    constructor(page)
    {
        this.page=page;
        this.loginpage = new LoginPage(page);
        this.dashboardpage = new DashboardPage(page);
        this.cartpage = new CartPage(page);
        this.checkoutpage = new CheckoutPage(page);
        this.confirmationpage = new ConfirmationPage(page);
        this.myorderspage = new MyOrdersPage(page);
    }

    getLoginPage()
    {
        return this.loginpage;
    }

    getDashboardPage()
    {
        return this.dashboardpage;
    }

    getCartPage()
    {
        return this.cartpage;
    }   

    getCheckoutPage()
    {
        return this.checkoutpage;
    }   

    getConfirmationPage()
    {
        return this.confirmationpage;
    }

    getMyOrdersPage()
    {
        return this.myorderspage;
    }


}