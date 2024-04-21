const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Alex Walker",
        username: "alexWalker",
        password: "aLeXwAlKeR",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "Lebron James",
        username: "lebronJames",
        password: "lEbRoNjAmEs",
      },
    });
    await page.goto("/");
  });

  test("front page can be opened and login form is shown", async ({ page }) => {
    const locator = await page.getByText("blogs");
    await expect(locator).toBeVisible();
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("user can log in", async ({ page }) => {
      await loginWith(page, "alexWalker", "aLeXwAlKeR");
      await expect(page.getByText("Alex Walker logged-in")).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
      await loginWith(page, "alexWalker", "wrong");

      const errorDiv = await page.locator(".error_message");
      await expect(errorDiv).toContainText("ERROR Wrong credentials");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(page.getByText("Alex Walker logged-in")).not.toBeVisible();
    });
  });

  describe("when logged in as first user", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "alexWalker", "aLeXwAlKeR");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "playwright blog", "playwright", "playwright.com");
      await expect(
        page.getByText("a new blog playwright blog by playwright is added!")
      ).toBeVisible();
      await expect(page.getByTestId("blog-title")).toBeVisible();
    });

    describe("when there is a blog", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "playwright blog",
          "playwright",
          "playwright.com"
        );
      });

      test("blog likes can be increased", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await expect(page.getByRole("button", { name: "hide" })).toBeVisible();
        await expect(page.getByText("likes 0 like")).toBeVisible();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1 like")).toBeVisible();
      });

      test("blog can be deleted by the user who created it", async ({
        page,
      }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "remove" }).click();
        await expect(page.getByTestId("blog-title")).not.toBeVisible();
      });

      describe("when logged in as second user", () => {
        beforeEach(async ({ page }) => {
          await page.getByRole("button", { name: "logout" }).click();
          await loginWith(page, "lebronJames", "lEbRoNjAmEs");
        });

        test("unable to view the delete button", async ({ page }) => {
          await expect(page.getByText("Lebron James logged-in")).toBeVisible();
          await expect(page.getByTestId("blog-title")).toBeVisible();
          await page.getByRole("button", { name: "view" }).click();
          await expect(
            page.getByRole("button", { name: "remove" })
          ).not.toBeVisible();
        });
      });

      describe("when one more blog is added", () => {
        beforeEach(async ({ page }) => {
          await page.getByRole("button", { name: "cancel" }).click();
          await createBlog(
            page,
            "playwright blog 2",
            "playwright 2",
            "playwright.com 2"
          );
        });

        test("blogs should be arranged acording to the likes", async ({
          page,
        }) => {
          await page
            .getByText("playwright blog 2")
            .getByRole("button", { name: "view" })
            .click();
          await page.getByRole("button", { name: "like" }).click();
          await expect(page.getByText("likes 1 like")).toBeVisible();
          await expect(page.getByTestId("blog-title").first()).toHaveText(
            "playwright blog 2 hide"
          );
          await expect(page.getByTestId("blog-title").last()).toHaveText(
            "playwright blog view"
          );
        });
      });
    });
  });
});
