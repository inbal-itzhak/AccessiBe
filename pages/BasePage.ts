import { Locator, Page, expect, test } from "@playwright/test";
export abstract class BasePage {

    constructor(protected page: Page) {

    }

   

    protected async validateElementText(element: Locator, expectedText: string) {
        await test.step(`Validating that a correct elemet text is  ${expectedText}`, async () => {
            await expect(element).toContainText(expectedText);
        });
    }

    protected async clickElement(element: Locator) {
        await test.step(`Clicking the '${element}' element`, async() => {
            await element.click();
        })
    }

    protected async fillText(element: Locator, textToFill: string) {
        await test.step(`Filling '${textToFill}' into the '${element}' element`, async() => {
            await element.fill(textToFill);
        })
    }

    protected async getCurrentPageUrl(): Promise<string>{
        const currentUrl = await this.page.url();
        return currentUrl.trim();
    }
}