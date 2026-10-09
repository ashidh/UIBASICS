const {test,expect} =require('@playwright/test');

test('Client App login', async ({page})=>{

   const Email = 'ashidhachu10@gmail.com';
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.locator("#userEmail").fill(Email);
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
await page.locator("text=Checkout").click();

//
await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
const dropdown=await page.locator(".ta-results")
await dropdown.waitFor();
const optionscount =await dropdown.locator("button").count();
for(let i=0;i<optionscount;++i)
{
    const optionText = await dropdown.locator("button").nth(i).textContent();
    if(optionText === " India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }
}
await expect(page.locator(".user__name [type='text']").first()).toHaveText(Email);
await page.getByRole('textbox').nth(1).fill('0123');
await page.getByRole('textbox').nth(2).fill('Ashidh');
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);
//go to orders page and find the order id and assert
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
for(let i=0;i<await rows.count();++i)
{
   const roworderId = await rows.nth(i).locator("th").textContent();
   if(orderId.includes(roworderId))
   {
      //click on view button
      await rows.nth(i).locator("button").first().click();
      break;
   }
}
const orderDetails = await page.locator(".col-text").textContent();
console.log(orderDetails);
expect(orderId.includes(orderDetails)).toBeTruthy();

});
