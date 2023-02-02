import { ProductType } from 'src/products/enums/product-type.enum';

export const productList = [
  {
    name: 'Maple Syrup Leaf 250ml',
    description:
      'Store in a cool and dark place. Heat and light can decrease the percentage of light transmission from bottled maple syrup and could affect the quality and the color of the syrup. Refrigerate after opening.',
    image:
      'https://i.cbc.ca/1.5913747.1613256030!/cumulusImage/httpImage/image.jpg_gen/derivatives/16x9_780/maple-syrup-shutterstock.jpg',
    price: 11.99,
    stock: 37,
    type: ProductType.AMBER,
  },
  {
    name: 'Maple Jelly',
    description:
      'If stored correctly (see above), maple jelly can be preserved for up to 2 years. Note that heat and light exposure can affect the quality and the colour of the product.',
    image:
      'https://i.guim.co.uk/img/media/e5f93855282ee032193c5976a4d17ea7ee9b2928/0_305_3587_2152/master/3587.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=8599decd8da0b5b446eac13f9289a30d',
    price: 7.99,
    stock: 99,
    type: ProductType.DARK,
  },
  {
    name: 'Brien Maple Syrup 50ml',
    description:
      'Maple syrup is the true essence of what we do. Our maple syrup is vegan, dairy-free, gluten-free, nut-free, certified Kosher and it doesn’t contain any additives.',
    image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/1045381/31602929.jpg',
    price: 99.99,
    stock: 29,
    type: ProductType.AMBER,
  },
];
