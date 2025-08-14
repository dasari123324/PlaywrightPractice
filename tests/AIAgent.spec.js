import {test,expect} from '@playwright/test';
import { ai } from '@zerostep/playwright';

test ('AI Testing capability', async({page})=>{
    const  aiArgs = {page,test}
    await page.goto('https://flipkart.com');
    const title = await ai("what is the title of the page?", aiArgs);
    console.log(title);
})