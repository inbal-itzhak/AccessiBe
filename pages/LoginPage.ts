import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export  class LoginPage extends BasePage {

    private usernameField: Locator;
    private passwordField: Locator;
    private loginBtn: Locator;
    private errorMessage: Locator;
    
    
    constructor(protected page: Page) {
        super(page);
        this.usernameField = this.page.locator('#user-name');
        this.passwordField = this.page.locator('#password');
        this.loginBtn = this.page.locator('#login-button');
        this.errorMessage = this.page.locator('[data-test="error"]')
    }


    public async loginToApplication(username:string, 
        password:string, 
        url:string) {
        await this.page.goto(url);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.clickElement(this.loginBtn);
    }

    public async validateErrorMessage(expectedError: string) {
        await this.validateElementText(this.errorMessage, expectedError)
    }

   
}