export class LoginPage
{
    constructor(page)
    {
        this.page=page
        this.useremail=page.locator("#userEmail");
        this.password=page.locator("#userPassword");
        this.loginbtn=page.locator("#login");
        this.firstproduct = page.locator(".card-body b").first();
        this.lastproduct = page.locator(".card-body b").last();
    }

    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async LoginAction(email,password)
    {
        await this.useremail.fill(email);
        await this.password.fill(password);
        await this.loginbtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.firstproduct.waitFor();
        await this.lastproduct.waitFor();
        console.log(this.firstproduct.textContent());
        console.log(this.lastproduct.textContent());
    }
}

//module.exports={LoginPage};