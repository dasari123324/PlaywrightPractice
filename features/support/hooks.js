import {POManager} from '../../tests/PageObject/POManager.js';
import playwright from 'playwright';
import { Before,After,BeforeStep,AfterStep,BeforeAll,AfterAll } from "@cucumber/cucumber";

//Before({tags: "@eCommerce or @eCommerce2 or @Parameters"},async function(){  // Runs with Tags
Before(async function(){  // Runs before scenario
        const browser = await playwright.chromium.launch({ headless: false });
        const context = await browser.newContext();
        this.page = await context.newPage();
    });

After(async function(){  // Runs after scenario
        await this.page.close();
        await this.page.context().browser().close();
        console.log("Browser is closed");
        console.log("Test is completed");
    });

BeforeStep(async function(){   // Runs Before each step

});

AfterStep(async function({result}){   // Runs After each step
    // if (result.status === 'failed') {
    //     await this.page.screenshot({ path: 'cucumber.png' });
    //     console.log("Screenshot taken");
    // }


    if (result.status === 'failed') {
        try {
          if (this.page) {
            //const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            //const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
            //const screenshotPath = path.join('screenshots', `${scenarioName}_${timestamp}.png`);
            //fs.mkdirSync('screenshots', { recursive: true });
            await this.page.screenshot({ path: 'cucumber.png' });
            console.log(`✅ Screenshot taken`);
          } else {
            console.log("⚠️ this.page is undefined in AfterStep.");
          }
        } catch (err) {
          console.error("❌ Failed to take screenshot:", err.message);
        }
      }
    
});

BeforeAll(async function(){   // Runs Before each step

});

AfterAll(async function(){   // Runs Before each step

});

