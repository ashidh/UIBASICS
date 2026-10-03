const {test,expect} =require('@playwright/test');

test.only('Client App login', async ({page})=>{

   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.locator("#userEmail").fill('ashidhachu10@gmail.com');
   await page.locator("#userPassword").fill('Achu@1998');
   await page.locator("[value='Login']").click();   
   await page.waitForLoadState('networkidle');
   await page.locator('.card-body b').first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   //Zara Coat 3
   const productName = 'ZARA COAT 3';
   const Products =page.locator(".card-body");
   const count=await Products.count();
   for(let i=0;i<count;i++)
   {
     if(await Products.nth(i).locator("b").textContent()===productName)
      {
         //add the product to cart
         await Products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();



});
