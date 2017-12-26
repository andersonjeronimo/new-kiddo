import { KiddoAppPage } from './app.po';

describe('kiddo-app App', () => {
  let page: KiddoAppPage;

  beforeEach(() => {
    page = new KiddoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
