import { AppPage } from './app.po';

describe('weather-station App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show an observation point', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Max (last 24h)');
  });
});
