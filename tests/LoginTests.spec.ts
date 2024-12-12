import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DataProvider } from './DataProvider';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.BASE_URL 



test.describe("Negative Login Scenarios", () => {
    
  let loginPage: LoginPage;

  test.beforeEach(async({page}) => {
      loginPage = new LoginPage(page);
      
  })

  const loginData = DataProvider.getInvalidLoginData();
  for (const {username, password, expectedError, description} of loginData){
    test(`login with ${description}, expected ${expectedError}`, async() =>{
      await loginPage.loginToApplication(username,password as string,baseUrl as string);
      await loginPage.validateErrorMessage(expectedError);
    });
  }

  const loginInputValidationData = DataProvider.loginInputValidation();
  for(const {username,password,expectedError,description} of loginInputValidationData){
    test(`login with ${description}`,async() =>{
      await loginPage.loginToApplication(username,password as string,baseUrl as string);
      await loginPage.validateErrorMessage(expectedError);
    });
  }
})

