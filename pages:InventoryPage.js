class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cart = '.shopping_cart_link';
    this.menuBtn = '#react-burger-menu-btn';
    this.logoutBtn = '#logout_sidebar_link';
  }

  async addItem(itemName) {
    await this.page.locator(`text=${itemName}`)
      .locator('..')
      .getByRole('button')
      .click();
  }

  async goToCart() {
    await this.page.click(this.cart);
  }

  async logout() {
    await this.page.click(this.menuBtn);
    await this.page.click(this.logoutBtn);
  }
}

module.exports = InventoryPage;