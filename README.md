# SauceDemo Playwright tests
## Prerequesite
**Installations**
clone main branch:
git clone https://github.com/inbal-itzhak/AccessiBe.git --branch main --single-branch <your-folder>  
navigate to <your-folder>  
cd <your-folder>  
install dependencies:  
npm install playwright-test  


## running the tests  
some tests are configured headed and some are configured headless  
to run all tests headed  
npx playwright test --headed     

to run all tests headless  
npx playwright test --headless  

to run html report for last test run  
npx playwright show-report  

.env file should not have values (left it for your convinience)  






