import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getDisplayText() {
    return element(by.id('display-main')).getText();
  }

  getKey(id: string) {
    return element(by.id(`key-${id}`));
  }
}
