export class DashboardPage
{
    constructor(page)
    {
        this.page=page;
        this.productbody = page.locator(".card-body");
        this.productstext= page.locator(".card-body b");
        this.cart=page.locator("[routerlink='/dashboard/cart']")
    }

async searchProductName(ProductName)
{
    console.log(await this.productstext.allTextContents());
    const productcount=await this.productbody.count();
    
    for(let i=0;i<productcount;++i)
    {
        if(await this.productbody.locator('b').nth(i).textContent()==ProductName);
        {
            await this.productbody.locator('text=Add To Cart').nth(i).click();
            break;
        }
    
    };
}

async navigateToCart()
{
    await this.cart.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('div li').first().waitFor();
}

}

//module.exports={DashboardPage};