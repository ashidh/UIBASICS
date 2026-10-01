const {test,expect} =require('@playwright/test');

test.only('UI Basics 2', async ({browser})=>{

   const context = await browser.newContext();
   const page = await context.newPage();
   const username = page.getByRole('textbox', { name: 'email@example.com' });
   const password = page.getByRole('textbox', { name: 'enter your passsword' });
   const loginButton = page.getByRole('button', { name: 'Login' });
   const cardTitles = page.locator('.card b');
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await username.fill('ashidhachu10@gmail.com');
   await password.fill('Achu@1998');
   await loginButton.click();
   //console.log(await cardTitles.first().textContent());
   //await page.waitForLoadState('networkidle');
   await cardTitles.first().waitFor();
   console.log(await cardTitles.allTextContents());


});
