import { expect } from '@playwright/test';

export class ConfirmationPage 
{

    constructor(page)
    {
        this.page=page;
        this.confirmationmessage=this.page.locator('.hero-primary');
        this.orderid=this.page.locator('.em-spacer-1 .ng-star-inserted');
        this.ordersmenu = this.page.locator("[routerlink='/dashboard/myorders']");
        this.orderlist = this.page.locator('.table');
    }

    async confirmationmessagewindow()
    {
        await this.confirmationmessage.waitFor();
        await expect(this.confirmationmessage).toContainText('Thankyou for the order.');
        const orderIDText = await this.orderid.textContent();
        console.log(orderIDText);

        return orderIDText.trim();

        //console.log(await this.orderid.textContent());
    }

    async myordersnavigation()
    {
        await this.ordersmenu.first().click();
        await this.orderlist.waitFor();
    }

}

//module.exports={ConfirmationPage};