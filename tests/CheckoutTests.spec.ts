import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DataProvider } from './DataProvider';
import { CheckoutForm } from '../pages/CheckoutForm';
import { NavigatinBar } from '../pages/NavigattionBar';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.BASE_URL 
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

test.describe("Input validation for checkout form",()=>{
    let loginPage: LoginPage;
    let checkoutForm: CheckoutForm;
    let navigatiomBar: NavigatinBar;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        checkoutForm = new CheckoutForm(page);
        navigatiomBar = new NavigatinBar(page)

    })
    test.afterEach(async({page}) => {
        page.close();
    })
    const checkoutFormValidation = DataProvider.checkoutFormValidation();
    for(const {firstName, lastName,zipCode,expectedError,firstNameInputValidation,lastNameInputValidation,zipCodeInputValidation,description} of checkoutFormValidation){
        test(`test checkout form with ${description}`, async() =>{
            await test.step('login and navigate to checkout form',async()=>{
                await loginPage.loginToApplication(username as string, password as string, baseUrl as string);
                await checkoutForm.navigateToCheckoutForm();
            });
            await test.step('fill in checkout form', async() =>{
                await checkoutForm.fillInCheckoutForm(firstName as string, lastName as string, zipCode as string);
            })
            
            const isFirstnameValid = await checkoutForm.firstNameInputValidation();
            const isLastnameValid = await checkoutForm.lastNameInputValidation();
            const isZipcodeValid = await checkoutForm.zipCodeInputValidation();
            expect(isFirstnameValid,'is first name valid').toBe(firstNameInputValidation);
            expect(isLastnameValid,'is last name valid').toBe(lastNameInputValidation);
            expect(isZipcodeValid,'is postal code valid').toBe(zipCodeInputValidation);

        });
    }

    const checkoutFormPositive = DataProvider.checkoutFormPositive();
    for (const{firstName,lastName,zipCode,url,description} of checkoutFormPositive) {
        test(`test checkout when ${description}`, async({page})=>{
            await test.step('login and navigate to checkput', async()=>{
                await loginPage.loginToApplication(username as string, password as string, baseUrl as string);
                await checkoutForm.navigateToCheckoutForm();
            })
            await test.step('fill in valid data',async()=>{
                await checkoutForm.fillInCheckoutForm(firstName as string, lastName as string, zipCode as string)
            })
            const actualUrl = await page.url();
            expect(actualUrl).toBe(url);
            
        })
    }



})
    