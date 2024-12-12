import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DataProvider } from './DataProvider';
import { NavigatinBar } from '../pages/NavigattionBar';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.BASE_URL 
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
test.use({headless:true})
test.describe("Verify navigation bar url's",()=>{
    let loginPage: LoginPage;
    let navigationBar: NavigatinBar;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        navigationBar = new NavigatinBar(page);
    })
    const urlTest = DataProvider.validateUrls();
    for(const {element, expectedUrl,description} of urlTest){
        test(`test ${description}`, async() =>{
            await test.step('login and open navigation bar',async()=>{
                await loginPage.loginToApplication(username as string, password as string, baseUrl as string);
                await navigationBar.openNavigationBar();
            })
            await test.step(`check url for element ${element}`,async()=>{
                const actualUrl = await navigationBar.getPageUrl(element);
                expect(actualUrl, `url of ${element}`).toBe(expectedUrl);
            })
            

        },
    );
    }

})
        
    
