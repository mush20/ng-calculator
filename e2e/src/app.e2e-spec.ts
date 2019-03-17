import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should start with 0', () => {
    page.navigateTo();
    expect(page.getDisplayText()).toEqual('0');
  });

  it('it should add', () => {
    page.navigateTo();
    page.getKey('1').click();
    page.getKey('add').click();
    page.getKey('1').click();
    page.getKey('calc').click();
    expect(page.getDisplayText()).toEqual('2');
  });

  it('it should subtract', () => {
    page.navigateTo();
    page.getKey('2').click();
    page.getKey('sub').click();
    page.getKey('1').click();
    page.getKey('calc').click();
    expect(page.getDisplayText()).toEqual('1');
  });

  it('it should multiply', () => {
    page.navigateTo();
    page.getKey('4').click();
    page.getKey('multi').click();
    page.getKey('2').click();
    page.getKey('calc').click();
    expect(page.getDisplayText()).toEqual('8');
  });

  it('it should divide', () => {
    page.navigateTo();
    page.getKey('4').click();
    page.getKey('div').click();
    page.getKey('2').click();
    page.getKey('calc').click();
    expect(page.getDisplayText()).toEqual('2');

  });


  it('it should calculate', () => {
    page.navigateTo();
    page.getKey('4').click();
    page.getKey('multi').click();
    page.getKey('2').click();
    page.getKey('sub').click();
    page.getKey('2').click();
    page.getKey('add').click();
    page.getKey('1').click();
    page.getKey('multi').click();
    page.getKey('3').click();
    page.getKey('div').click();
    page.getKey('2').click();
    page.getKey('calc').click();
    expect(page.getDisplayText()).toEqual('10.5');
  });

  it('it should repeat equation', () => {
    page.navigateTo();
    page.getKey('1').click();
    page.getKey('0').click();
    page.getKey('add').click();
    page.getKey('2').click();
    page.getKey('calc').click();
    page.getKey('calc').click();
    page.getKey('calc').click();
    page.getKey('calc').click();
    expect(page.getDisplayText()).toEqual('18');
  });
});
