import { Browser, BrowserContext, chromium, Page } from "playwright";
import HomePage from "../page-object/home.page";
import LoginPage from "../page-object/login.page"
import PageGhostPage from "../page-object/page-ghost.page";
import PageEditorPage from "../page-object/page-editor.page";
import Env from "../util/environment";

import { test, expect } from '@playwright/test';
import DesignPage from "../page-object/design.page";
import ContentMainPage from "../page-object/content-main.page";
import ContentPagePage from "../page-object/content-page.page";

test.describe("PA007: Modificar titulo de página y verificar enlace antiguo no opere", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    //pageObject variables
    let login: LoginPage;
    let home: HomePage;
    let pageGhost: PageGhostPage;
    let pageEditor: PageEditorPage;
    let design: DesignPage;
    let contentMain: ContentMainPage;
    let contentPage: ContentPagePage;

    test.beforeAll( async() => {
        browser = await chromium.launch({
            headless: Env.HEADLESS
        });
        context = await browser.newContext({ viewport: { width: 1200, height: 600 } });
        page = await context.newPage();

        //Given I navigate to admin module
        await page.goto(Env.BASE_URL + Env.ADMIN_SECTION);
        login = new LoginPage(page);
        home = new HomePage(page);
        pageGhost = new PageGhostPage(page);
        pageEditor = new PageEditorPage(page);
        design = new DesignPage(page);
        contentMain = new ContentMainPage(page);
        contentPage = new ContentPagePage(page);
    });

    test("should modify a page title link and related link in navbar and navigation should fail - Positive scenario", async () => {
        // Given I log in and navigate 
        await login.signInWith(Env.USER, Env.PASS);
        // Given I created my page to link
        await home.clickPagesLink();
        expect(page.url()).toContain("/#/pages");
        await pageGhost.clickNewPageLink();
        expect(page.url()).toContain("/#/editor/page");
        await pageEditor.fillPageTitle("PaginaADesenlazar");
        await pageEditor.fillPostContent("Érase una vez una página a desenlazar");
        await pageEditor.clickPublishLink();
        await pageEditor.clickPublishButton();
        await pageEditor.clickPagesLink();
        
        // Given The new page is linked to a navBar item
        await home.clickDesignLink();
        await design.fillNewLabelInput("PaginaADesenlazar");
        await design.fillNewLinkInput("paginaADesenlazar");
        await design.clickSaveButton();
        await new Promise(r => setTimeout(r, 2000));
        
        //When I modify the page's title link
        await home.clickPagesLink();
        const linkCreatedPage = await pageGhost.findPageByTitle("PaginaADesenlazar");
        expect(linkCreatedPage).not.toBeNull();
        await pageGhost.navigateToEditionLink(linkCreatedPage);
        await pageEditor.fillPageTitle("PaginaDesenlazada");
        await pageEditor.clickSettingsButton();
        await pageEditor.refillPageUrlField("paginaDesenlazada");
        await pageEditor.clickCloseSettingsButton();
        await pageEditor.clickUpdateLink();
        await pageEditor.clickUpdateButton();
        await pageEditor.clickPagesLink();
        const linkEditedPage = await pageGhost.findPageByTitle("PaginaDesenlazada");
        expect(linkEditedPage).not.toBeNull();

        // Then I can navigate to the old page through the same old navbar item
        await page.goto(Env.BASE_URL);
        await contentMain.clickNavBarLink("paginaADesenlazar");
        await contentPage.elePageTitle("404");
        await contentPage.elePageSomeContent("Page not found");
        await new Promise(r => setTimeout(r, 2000));
    });

    test.afterAll(async () => {
        await page.goto(Env.BASE_URL + Env.ADMIN_SECTION);
        await new Promise(r => setTimeout(r, 1500));
        await home.clickPagesLink();
        const linkCreatedPage = await pageGhost.findPageByTitle("PaginaDesenlazada");
        expect(linkCreatedPage).not.toBeNull();
        await pageGhost.navigateToEditionLink(linkCreatedPage);
        await pageEditor.clickSettingsButton();
        await pageEditor.clickDeleteButton();
        await pageEditor.clickConfirmDeleteButton();
        await page.waitForURL('**/#/pages');
        await home.clickDesignLink();
        await design.clickDeleteLastNavItemButton();
        await design.clickSaveButton();

        await page.close();
        await context.close();
        await browser.close();
    })

});