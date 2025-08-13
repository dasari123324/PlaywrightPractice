import {test,request,expect} from '@playwright/test'

test('Network Call Abort test', async({page})=>{

        // blocks that particular network call from being made
        await page.route('**/*.{jpg,png,jpeg}',route=>route.abort());

        // returns all the network calls and their statuc codes
        await page.on('request',request=>console.log(request.url()));
        await page.on('response',response=>console.log(response.url(),response.status()));

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        console.log(await page.title());
        await page.locator("input#username").fill("rahulshettyacademy");
        await page.locator("[type='password']").fill("learning");
        await page.locator('.btn.btn-info.btn-md').click();
        await page.pause();

        await page.waitForLoadState('networkidle');
        const cardtitles=page.locator(".card-body .card-title a");
        console.log(await cardtitles.first().textContent());
        console.log(await cardtitles.nth(1).textContent());


});