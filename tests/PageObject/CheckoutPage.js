import { expect } from "@playwright/test";

export class CheckoutPage
{
    constructor(page)
    {
        this.page=page;
        this.drpdown = page.locator("[placeholder*='Country']");
        this.countrylist=page.locator('.ta-results.list-group.ng-star-inserted');
        this.itmlist=this.countrylist.locator('button');
        this.cardnumber = page.locator(".field [type='text']").first();
        this.expirymonth = page.locator('select').first();
        this.expiryyear = page.locator('select').last();
        this.cvv = page.locator(".field [type='text']").nth(1);
        this.name = page.locator(".field [type='text']").nth(2);
        this.couponcode = page.locator(".field [type='text']").nth(3);
        this.couponconfirm = page.locator("button[type='submit']");
        this.checkoutconfirm = page.locator('.action__submit')

    }

    async checkoutpageactions(CountryName,CountryFullName)
    {
        await this.drpdown.pressSequentially(CountryName); // Replacing pressSequentially
        await this.countrylist.waitFor();
        const itmcount = await this.itmlist.count();
        console.log("itmcount is",itmcount);
        
        for (let i = 0; i < itmcount; ++i) {
            if (await this.itmlist.nth(i).textContent() === CountryFullName) {
                await this.itmlist.nth(i).click();
                break;
            }
            else
            {
                const country = await this.itmlist.nth(i).textContent();
                console.log("Country not found",country);
            }
        }
        await expect(this.page.locator(".user__name [type='text']").first()).toHaveText('dasarisantosh07@gmail.com');
        await this.cardnumber.fill('1234567890123456');
        await this.expirymonth.selectOption('03');
        await this.expiryyear.selectOption('29');
        await this.cvv.fill('123');
        await this.name.fill('Santosh Dasari');
        await this.couponcode.fill('rahulshettyacademy');
        await this.couponconfirm.click();
        await expect(this.page.locator("[style*='green']")).toContainText('* Coupon Applied');
        await this.checkoutconfirm.click();
        await this.page.waitForLoadState('networkidle');
    }
}

//module.exports={CheckoutPage};