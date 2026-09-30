import { test } from '#testkit/functions/application/burger/testFixtures';
import { loadTestDataFile } from '#testkit/functions/application/burger/adapters/testData.adapter';
import { TestData } from '#testkit/types/TestData/test-data-burger';
import * as burger from '#testkit/functions/application/burger/burger';

test.beforeEach(async ({ page, restaurantSampleAppUrl }) => {
    await page.goto(restaurantSampleAppUrl);
});

test('Restaurant Sample App - Smoke', async ({ page }, testInfo) => {
    const midtown = loadTestDataFile<TestData.Location>('location', 'midtown.json');
    const highland = loadTestDataFile<TestData.Location>('location', 'highland.json');
    const southland = loadTestDataFile<TestData.Location>('location', 'southland.json');

    await burger.verifyHeaderBar(page);

    await burger.selectLocation(page, midtown);
    await burger.verifyLocationSelected(page, midtown);
    await burger.navigateToLunchMenu(page);
    await burger.verifyLunchMenuPageByLocation(page, midtown);
    await burger.navigateToDinnerMenu(page);
    await burger.verifyDinnerMenuPageByLocation(page, midtown);

    await burger.changeLocation(page, highland);
    await burger.verifyLocationSelected(page, highland);
    await burger.navigateToLunchMenu(page);
    await burger.verifyLunchMenuPageByLocation(page, highland);
    await burger.navigateToDinnerMenu(page);
    await burger.verifyDinnerMenuPageByLocation(page, highland);

    await burger.changeLocation(page, southland);
    await burger.verifyLocationSelected(page, southland);
    await burger.navigateToLunchMenu(page);
    await burger.verifyLunchMenuPageByLocation(page, southland);
    await burger.navigateToDinnerMenu(page);
    await burger.verifyDinnerMenuPageByLocation(page, southland);

    await burger.navigateToCart(page);
    await burger.verifyEmptyCartPage(page);
});
