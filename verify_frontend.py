import os
from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()

        # Bypass Welcome Wizard
        context.add_init_script("localStorage.setItem('starship_wizard_completed', 'true')")

        page = context.new_page()
        try:
            page.goto("http://localhost:5173")

            # Wait for app to load
            page.wait_for_selector("header")

            # Check for Preset Dropdown
            print("Checking for Preset Dropdown...")
            preset_button = page.get_by_text("Presets")
            if preset_button.is_visible():
                print("Preset dropdown found.")
                preset_button.click()
                page.wait_for_timeout(500) # Wait for animation
                page.screenshot(path="verification_dropdown.png")
            else:
                print("Preset dropdown NOT found.")

            # Check Undo/Redo
            print("Checking Undo/Redo buttons...")
            undo_btn = page.get_by_label("Undo") # using aria-label
            if undo_btn.is_visible():
                print("Undo button found.")

            # Perform an action to enable undo
            print("Modifying theme...")
            # Toggle a module
            # Find a checkbox in ModuleList (first one)
            checkbox = page.locator("input[type='checkbox']").first
            checkbox.click()
            page.wait_for_timeout(500)

            # Undo should be enabled now (not disabled)
            if not undo_btn.is_disabled():
                print("Undo button enabled after action.")
            else:
                print("Undo button still disabled.")

            page.screenshot(path="verification_undo.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
