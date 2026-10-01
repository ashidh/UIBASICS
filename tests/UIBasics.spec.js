const {test,expect}=require('@playwright/test');

test('Browser context playwright test', async ({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    const username=page.locator('#username');
    const password=page.locator('[type=password]');
    const signIn=page.locator('#signInBtn');
    const cardTitles=page.locator('.card-body a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractice/');
    console.log(await page.title());
    await username.fill('rahulshettyacademy');
    await password.fill('Learning');
    await signIn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    //type -fill
    await username.fill('');
    await username.fill('rahulshettyacademy');
    await password.fill('');
    await password.fill('Learning@830$3mK2');
    await signIn.click();
    console.log(await cardTitles.first().textContent());
   // console.log(await cardTitles.nth(1).textContent());
   //console.log(await cardTitles.last().textContent());
    console.log(await cardTitles.allTextContents());









});

test('Page playwright test', async ({page})=>
{
    await page.goto('https://google.com');
    //get title assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
})