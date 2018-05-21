import { IlinkManagerPage } from './app.po';

describe('ilink-manager App', function() {
  let page: IlinkManagerPage;

  beforeEach(() => {
    page = new IlinkManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
