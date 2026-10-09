const {test, expect} = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
    //Login credentials
    const EMAIL = 'ashidhachu10@gmail.com';
    const PASSWORD = 'Admin@12345';

async function login(page){
    await page.goto(BASE_URL);
    await page.getByPlaceholder('you@email.com').fill(EMAIL);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}
test('create event via UI, book it, and verify seat reduction', async ({page}) => {

    // Step 1: Log in to the application
    await login(page);

    // Step 2: Create a new event via admin form
})