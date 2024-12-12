import { Locator, Page,test,expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { link } from "fs";

export  class NavigatinBar extends BasePage {
    private burgerMenuBTN:Locator;

    constructor(protected page: Page) {
        super(page);
        this.burgerMenuBTN = this.page.locator('#react-burger-menu-btn')
    }

    public async openNavigationBar(){
        await this.clickElement(this.burgerMenuBTN);

    }

public async getPageUrl(element:string): Promise<string>
{
    const linkElement = this.page.locator(element);
    await this.clickElement(linkElement);
    const currentUrl = await this.page.url();
    return currentUrl.trim();
}


    
 public async validateLinkUrl(element:string,url: string) {
    const linkElement = await this.page.waitForSelector(element);
    if(linkElement!= null)
    {
        const actualUrl = await linkElement.getAttribute('href')
        await test.step(`Validating that a correct value of URL is ${url}`, async () => {
        await expect(actualUrl,`the url of ${element}`).toBe(url)
        })
    }
    
    }

}
