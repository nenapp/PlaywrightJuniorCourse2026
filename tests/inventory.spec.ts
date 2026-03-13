import test, { expect } from "@playwright/test";

test("Verify all products are visible", async({page}) =>{
    //Navigate to SauceDemo
    await page.goto("")
    await expect(page).toHaveTitle("Swag Labs")

    // Login
    await page.fill("#user-name", "standard_user")
    await page.fill("#password", "secret_sauce")
    await page.getByTestId('login-button').click() //await page.click("[data-test='login-button']")
    await expect(page.getByTestId('title')).toHaveText('Products', { timeout: 10000 })

    for(let i=0; i<6; i++) {
    await expect(page.getByTestId('inventory-item').nth(i)).toBeVisible()
    await expect(page.getByTestId('inventory-item-name').nth(i)).toBeVisible()
    await expect(page.locator('.inventory_item_desc').nth(i)).toBeVisible()
    await expect(page.locator('.btn_primary').nth(i)).toBeVisible()
    await expect(page.getByTestId('inventory-item-price').nth(i)).toBeVisible()
    }
});

test ("Product name should match in inventory and cart page", async ({ page }) =>{
    //Navigate to SauceDemo
    await page.goto("")
    await expect(page).toHaveTitle("Swag Labs")

    // Login
    await page.fill("#user-name", "standard_user")
    await page.fill("#password", "secret_sauce")
    await page.getByTestId('login-button').click() //await page.click("[data-test='login-button']")
    await expect(page.getByTestId('title')).toHaveText('Products')

    //Store item title on inventory page
    const sauceLabsBackpack = page.locator('.inventory_item').first()
    const sauceLabsBackpackName = await sauceLabsBackpack.getByTestId('inventory-item-name').textContent()
    const sauceLabsBackpackDesc = await sauceLabsBackpack.getByTestId('inventory-item-desc').textContent()
    console.log(sauceLabsBackpackName)
    console.log(sauceLabsBackpackDesc)

    //Click add to cart
    await page.getByRole('button', { name: 'Add to cart'}).first().click()
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()

    //Click shopping cart badge
    await page.getByTestId('shopping-cart-link').click()
    await expect(page.getByTestId('title')).toHaveText('Your Cart')

    //Store item title on cart page
    const cartSauceLabsBackpackName = await page.getByTestId('inventory-item-name').textContent()
    const cartSauceLabsBackpackDesc = await page.getByTestId('inventory-item-desc').textContent()

    //Validate names match
    expect(cartSauceLabsBackpackName).toBe(sauceLabsBackpackName)
    expect(cartSauceLabsBackpackDesc).toBe(sauceLabsBackpackDesc)
});