# Interface Segregation Principle (ISP)

No client should be forced to depend on methods it does not use.

Let's say we have a class that implements an interface with some methods and another class wants to implement that same interface but should not implement all the methods given by the interface then we would have this flaw in the design and break this principle.

Flags to indentify violations of ISP

- Fat Interfaces
- Interfaces with low cohesion
- Empty method implementations

[Return to Intro](./intro.md)