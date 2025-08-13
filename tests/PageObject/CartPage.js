import {expect} from "@playwright/test";

export class CartPage
{
    constructor(page)
    {
        this.page=page;
        this.validateProductname = page.locator("h3:has-text('IPHONE 13 PRO')")
        this.checkoutbtn = page.locator("button[type='button']").last();
    }

    async navigateToCheckout()
    {
        const bool=this.validateProductname.isVisible();
        expect(bool).toBeTruthy();
        await this.checkoutbtn.click();
    }
}

//module.exports={CartPage};