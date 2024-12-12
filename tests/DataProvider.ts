import dotenv from 'dotenv';
dotenv.config();
const password = process.env.PASSWORD;


const invalidUserOrPassword = 'Epic sadface: Username and password do not match any user in this service';
const lockedOutUserError = 'Epic sadface: Sorry, this user has been locked out.';
// DataProvider.ts
export class DataProvider {
    static getInvalidLoginData() {
      return [
        { username: 'standard_user', password: 'wrong_password', expectedError: invalidUserOrPassword, description: 'wrong password' },
        { username: 'invalid_user', password: password, expectedError: invalidUserOrPassword, description: 'Invalid user' },
        { username: 'locked_out_user', password: password, expectedError: lockedOutUserError, description: 'lockedOutUserError' },
      ];
    }

    static loginInputValidation() {
        return [
          { username: '', password: password, expectedError: 'Epic sadface: Username is required', description: 'missing username' },
          { username: 'standard_user', password: '', expectedError: 'Epic sadface: Password is required', description: 'missing password' },
        ];
      }
    static validateUrls(){
        return[
            {element:'#inventory_sidebar_link', expectedUrl:'https://www.saucedemo.com/inventory.html',description:'Inventory url'},
            {element:'#about_sidebar_linkutton', expectedUrl:'https://www.saucedemo.com/about.html',description:'About url'},
            {element:'#logout_sidebar_link', expectedUrl:'https://www.saucedemo.com/',description:'Logout url'},
            {element:'#reset_sidebar_link', expectedUrl:'https://www.saucedemo.com/resetAppState.html',description:'Reset app state url'},
        ]
    } 

    static checkoutFormValidation(){
      return[
         {firstName:'',lastName:'',zipCode:'', expectedError:'Error: First Name is required',firstNameInputValidation:false, lastNameInputValidation:false,zipCodeInputValidation:false,description:'all values are empty'},
         {firstName:'first name',lastName:'',zipCode:'', expectedError:'Error: Last Name is required',firstNameInputValidation:true, lastNameInputValidation:false,zipCodeInputValidation:false,description:'only first name has value'},
         {firstName:'',lastName:'check last name',zipCode:'', expectedError:'Error: First Name is required',firstNameInputValidation:false, lastNameInputValidation:true,zipCodeInputValidation:false,description:'only last name has value'},
         {firstName:'',lastName:'',zipCode:'999999', expectedError:'Error: First Name is required',firstNameInputValidation:false, lastNameInputValidation:false,zipCodeInputValidation:true,description:'only zip code has value'},
         {firstName:'first name',lastName:'last name',zipCode:'', expectedError:'Error: Postal Code is required',firstNameInputValidation:true, lastNameInputValidation:true,zipCodeInputValidation:false,description:'only zip code value is missing'},
      ]
    }

    static checkoutFormPositive(){
      return[
        {firstName:'first name',lastName:'last name',zipCode:'9999', url:'https://www.saucedemo.com/checkout-step-two.html', description:'all values passed'} 
      ]
    }
    
    }
