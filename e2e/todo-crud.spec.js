import { test, expect } from '@playwright/test'

test('full todo CRUD flow: create, complete, and delete', async ({ page }) => {
  await page.goto('/')

  // Verify the page loads with the heading
  await expect(page.getByRole('heading', { name: 'My Todo List' })).toBeVisible()

  // Fill in a new todo and submit
  const todoTitle = `Test todo ${Date.now()}`
  const textbox = page.getByRole('textbox')
  await textbox.fill(todoTitle)
  await page.getByRole('button', { name: 'Add Todo' }).click()

  // Assert the new todo appears in the list
  const todoLabel = page.getByText(todoTitle)
  await expect(todoLabel).toBeVisible()

  // Click the checkbox to mark it as done
  const checkbox = page.getByRole('checkbox').last()
  await checkbox.click()

  // Assert the label gets the completed class (strikethrough)
  await expect(todoLabel).toHaveClass('todo-item-label-completed')

  // Click the Delete button for this todo
  await page.getByRole('button', { name: 'Delete' }).last().click()

  // Assert the todo is removed from the list
  await expect(todoLabel).not.toBeVisible()
})
