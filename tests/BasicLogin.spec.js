import {test,context,page,expect} from '@playwright/test';

test("Login Method Test", async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // assigning all the locators to the constants
    const username=page.locator("input#username");
    const password=page.locator("[type='password']");
    const signinbtn=page.locator('.btn.btn-info.btn-md');
    const errorblock=page.locator("[style*='block']");
    const cardtitles=page.locator(".card-body .card-title a");

    // Incorrect login and fetching the error message text
    await page.locator("input#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator('.btn.btn-info.btn-md').click();
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect'); or the below way can alos be used
    console.log(errorblock.textContent());
    await expect(errorblock).toContainText('Incorrect');

    // Erasing the previous entry and entering the correct login credentials
    // also validating text post successful login
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learning");
    await signinbtn.click();

// This is used to wait for the all the network calls to be made and then execute the next line of code
    await page.waitForLoadState('networkidle');

    console.log(await cardtitles.first().textContent());
    console.log(await cardtitles.nth(1).textContent());
    console.log(await cardtitles.nth(2).textContent());
    console.log(await cardtitles.last().textContent());

    // grab all the titles in an array when there are multiple elements with the same locator
    console.log(await cardtitles.allTextContents());

    //await new Promise(() =>{}); // this is to keep the browser open for some time

});