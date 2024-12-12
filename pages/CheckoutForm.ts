import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export  class CheckoutForm extends BasePage {

    
    private thankYouMessageElement: Locator;
    private backHomeButton: Locator;
    private shoppingCart: Locator;
    private checkOutBtn: Locator;
    private checkoutFirstName: Locator;
    private checkoutLastName: Locator;
    private checkoutZipCode: Locator;
    private checkoutContinueBtn: Locator;
    private checkoutErrors: Locator;
    private inputErrorIcon: Locator;



    constructor(protected page: Page) {
        super(page);
        this.shoppingCart =  page.locator('[data-test="shopping-cart-link"]');
        this.checkOutBtn = page.locator('#checkout');
        this.checkoutFirstName = page.locator('#first-name');
        this.checkoutLastName = page.locator('#last-name');
        this.checkoutZipCode = page.locator('#postal-code');
        this.checkoutContinueBtn =  page.locator('input[data-test="continue"]');
        this.checkoutErrors =  page.locator('[data-test="error"]');
        this.inputErrorIcon =  page.locator('.input_error.form_input.error');
        
        this.thankYouMessageElement = page.locator('[class="complete-header"]');
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
    }

    public async navigateToCheckoutForm(){
        this.clickElement(this.shoppingCart);
        this.clickElement(this.checkOutBtn);
    }

    public async fillInCheckoutForm(firstName: string, lastName:string,zipCode:string){
        await this.page.waitForSelector('#first-name');
        const firstNameAttr = await this.checkoutFirstName.getAttribute('name');
        const lastNameAttr = await this.checkoutLastName.getAttribute('name');
        const zipCodeAttr = await this.checkoutZipCode.getAttribute('name');
        console.log(`firstname element is ${firstNameAttr}, lastname element is ${lastNameAttr}, zipcode element is ${zipCodeAttr}`);

        await this.fillText(this.checkoutFirstName,firstName);
        await this.fillText(this.checkoutLastName,lastName);
        await this.fillText(this.checkoutZipCode,zipCode);
        await this.page.screenshot({path:'checkoutFormFull.png'})
       await this.clickElement(this.checkoutContinueBtn);
    }

    public async validateErrorMessage(expectedError:string){
        this.validateElementText(this.checkoutErrors,expectedError);
    }

   

    public async firstNameInputValidation():Promise<boolean>{
        const firstNameFielsValidation = await this.checkoutFirstName.getAttribute('class');
        if(firstNameFielsValidation == 'input_error form_input error')
            {
                 return false
            }
        return true;
    }

    public async lastNameInputValidation():Promise<boolean>{
        const lastNameFielsValidation = await this.checkoutLastName.getAttribute('class');
        if(lastNameFielsValidation == 'input_error form_input error')
            {
                 return false
            }
        return true;
    }
    public async zipCodeInputValidation():Promise<boolean>{
        const zipCodeFielsValidation = await this.checkoutZipCode.getAttribute('class');
        if(zipCodeFielsValidation == 'input_error form_input error')
            {
                 return false
            }
        return true;
    }
}