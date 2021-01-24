import Discount from './Discount';

class Product {
  readonly id: string;

  readonly priceInCents: number;

  readonly title: string;

  readonly description: string;

  readonly discount: Discount;

  constructor({
    id,
    priceInCents,
    title,
    description,
    discount = { percentage: 0, valueInCents: 0 },
  }: {
    id: string;
    priceInCents: number;
    title: string;
    description: string;
    discount?: Discount;
  }) {
    this.id = id;
    this.priceInCents = priceInCents;
    this.title = title;
    this.description = description;
    this.discount = discount;
  }
}

export default Product;
