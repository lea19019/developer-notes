# Objects, Classes, & Data Containers / Structures

It is good that we have a clear understanding what a class is, that way we can use it properly and not mix it with just a way of storing variables that would make confusion.

## Polymorphism

A way to make an class have a method that do different "things". It is a powerful concept that would help us avoid code duplication and have nested if statements. Look at the following example:

```ts
type Purchase = any;

let Logistics: any;

class Delivery {
  private purchase: Purchase;

  constructor(purchase: Purchase) {
    this.purchase = purchase;
  }

  deliverProduct() {
    if (this.purchase.deliveryType === 'express') {
      Logistics.issueExpressDelivery(this.purchase.product);
    } else if (this.purchase.deliveryType === 'insured') {
      Logistics.issueInsuredDelivery(this.purchase.product);
    } else {
      Logistics.issueStandardDelivery(this.purchase.product);
    }
  }

  trackProduct() {
    if (this.purchase.deliveryType === 'express') {
      Logistics.trackExpressDelivery(this.purchase.product);
    } else if (this.purchase.deliveryType === 'insured') {
      Logistics.trackInsuredDelivery(this.purchase.product);
    } else {
      Logistics.trackStandardDelivery(this.purchase.product);
    }
  }
```

After polymorphism
```ts
type Purchase = any;

let Logistics: any;

interface Delivery {
  deliverProduct();
  trackProduct();
}

class DeliveryImplementation {
  protected purchase: Purchase;

  constructor(purchase: Purchase) {
    this.purchase = purchase;
  }
}

class ExpressDelivery extends DeliveryImplementation implements Delivery {
  deliverProduct() {
    Logistics.issueExpressDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackExpressDelivery(this.purchase.product);
  }
}

class InsuredDelivery extends DeliveryImplementation implements Delivery {
  deliverProduct() {
    Logistics.issueInsuredDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackInsuredDelivery(this.purchase.product);
  }
}

class StandardDelivery extends DeliveryImplementation implements Delivery {
  deliverProduct() {
    Logistics.issueStandardDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackStandardDelivery(this.purchase.product);
  }
}

function createDelivery(purchase) {
  if (purchase.deliveryType === 'express') {
    delivery = new ExpressDelivery(purchase);
  } else if (purchase.deliveryType === 'insured') {
    delivery = new InsuredDelivery(purchase);
  } else {
    delivery = new StandardDelivery(purchase);
  }
  return delivery;
}

let delivery: Delivery = createDelivery({});

delivery.deliverProduct();
```

Classes should typically stay small, or at least that would be the preferred way. THey should also focus only in one responsability, taking care of just one "object" we can say. The class can do multiple things but everything should be related to one "thing".

How well are the class methods using the class properties? This is a good question to help us know when a class is too "big". This concept is know as **cohesion**.

[Return to Home](./README.md)