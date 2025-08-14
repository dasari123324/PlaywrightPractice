import {test} from "@playwright/test";
import { expect} from "@playwright/test";
import { ai } from "@zerostep/playwright";

test('Testing Zerostep AI Example',async({page})=>{
    //test.setTimeout(120_000);
    const aiArgs = {test,page};
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await ai('Enter "rahulshettyacademy" as Username',aiArgs);
    await ai('Enter "learning" as Password',aiArgs);
    await ai('Click on Login Button',aiArgs);
    await page.waitForTimeout(8_000);
    await ai('Click on Add button for iPhone X',aiArgs);
    await ai('click on checkout button',aiArgs);
    await ai('click on checkout button which is in green color',aiArgs);
    await ai('Enter the text ind in the input field and wait for the suggestions',aiArgs);
    await ai('Once the suggestions are populated select India link',aiArgs);
    await ai('Click on the checkbox',aiArgs);
    await ai('Click on purchase button',aiArgs);
    const bool = await ai("confirm that the purchase success message is displayed",aiArgs);
    const text = await ai("Fetch the success message",aiArgs);
    expect(bool).toBe(true);
    console.log(text);
});