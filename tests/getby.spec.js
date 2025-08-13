import {test,expect} from '@playwright/test';

test('Get By Methods testing', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('Qwerty123');
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole("link",{name:'Shop'}).click();

   await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole("button").click();

  

    // const cardbody=page.locator('card-body');
    // const cardcount=await cardbody.count();

    // for(let i=0;i<cardcount;++i)
    // {
    //     if(await cardbody.nth(i).locator('a').textContent()=='Nokia Edge')
    //     {
    //         const addbtn=page.locator('.card-footer');
    //         await addbtn.nth(i).locator('button').click();
    //         break;
    //     }
    // }

    await page.pause();


});