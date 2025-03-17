// tests/test-1.spec.ts
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseURL = 'https://c3-maillime.vercel.app/';

test('Send a message', async ({ page }) => {
  const randomMessage = faker.lorem.sentence();
  await page.goto(baseURL);
  await page.getByRole('button', { name: 'Open chat window' }).click();
  await expect(page.locator('#chatwoot_live_chat_widget').contentFrame().getByRole('button')).toContainText('Start Conversation');
  await page.locator('#chatwoot_live_chat_widget').contentFrame().getByRole('button', { name: 'Start Conversation' }).click();
  await page.locator('#chatwoot_live_chat_widget').contentFrame().getByRole('textbox', { name: 'Type your message' }).click();
  await page.locator('#chatwoot_live_chat_widget').contentFrame().getByRole('textbox', { name: 'Type your message' }).fill(randomMessage);
  await page.locator('#chatwoot_live_chat_widget').contentFrame().getByRole('button').nth(2).click();
});

test('Send an Attachment', async ({ page }) => {
  await page.goto(baseURL);
  await page.getByRole('button', { name: 'Open chat window' }).click();
  await expect(page.locator('#chatwoot_live_chat_widget').contentFrame().getByRole('button')).toContainText('Start Conversation');
  await page.locator('#chatwoot_live_chat_widget').contentFrame().getByRole('button', { name: 'Start Conversation' }).click();
  await page.locator('#chatwoot_live_chat_widget').contentFrame().locator('label').click();
  await page.locator('#chatwoot_live_chat_widget').contentFrame().getByLabel('', { exact: true }).setInputFiles('test.pdf');
  await page.getByRole('button').click();
});