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

public async getPageUrl(element:string): Promise<string> {
    const linkElement = this.page.locator(element);
    await this.clickElement(linkElement);
    const currentUrl = this.getCurrentPageUrl();
    return currentUrl;
}
}
