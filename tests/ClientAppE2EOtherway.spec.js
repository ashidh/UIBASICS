const {test,expect} =require('@playwright/test');

test('Client App login', async ({page})=>{

   const Email = 'ashidhachu10@gmail.com';
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.getByPlaceholder("email@example.com").fill(Email);
   await page.getByPlaceholder("enter your passsword").fill('Achu@1998');
   await page.getByRole('button', {name: 'Login'}).click();
   await page.waitForLoadState('networkidle');
   await page.locator('.card-body b').first().waitFor();
   await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).
   getByRole('button', {name: ' Add To Cart'}).click();
   await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click();
 
   await page.locator("div li").first().waitFor();
   await page.getByText("ZARA COAT 3").isVisible();

   await page.getByRole('button', {name: 'Checkout'}).click();

//
await page.getByPlaceholder('Select Country').pressSequentially("ind",{delay:150});
await page.getByRole('button', {name: 'India'}).nth(1).click();
await page.getByText('PLACE ORDER').click();
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();



});
