//const {ConfirmationPage} = require('./ConfirmationPage');
//import { ConfirmationPage } from './ConfirmationPage';

export class MyOrdersPage
{
    constructor(page)
    {
        this.page=page;
        this.orderlist = this.page.locator('.table');
        this.ordercount=this.page.locator('.table .ng-star-inserted');
    }


    async orderlistcontent(orderIDText) {
        await this.orderlist.waitFor();
        const orderscount = await this.ordercount.count();

        for (let i = 0; i < orderscount; ++i) {
            const check = await this.ordercount.locator('th').nth(i).textContent();
            console.log("check is:", check, "| Length:", check.length);
            console.log("orderIDText is:", orderIDText, "| Length:", orderIDText.length);
//          if (check.trim().includes(orderIDText)) {  // Compare trimmed text
//            if (check.trim() === orderIDText.trim()) {  // Compare trimmed text
            if(check.trim().includes(orderIDText.replace(/\|/g, "").trim())) {
                await this.ordercount.locator('.btn-primary').nth(i).click();
                break;
            }
        }
}}

//module.exports={MyOrdersPage};