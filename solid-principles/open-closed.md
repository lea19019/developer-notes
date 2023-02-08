# Open-Closed Principle (OCP)

Software components should be closed for modification, but open for extension.

**Closed for modification:** New features getting added to the software component, should NOT have to modify existing code.

**Open for extension:** A software component should be extendable to add a new feature or to add a new behavior to it.

You would essentially need to make your classes be able to extend functionalities in a simple way, without needing to modify the inner work if you want to add a feature.

The more we modify the inner code, the more we would have to spend writing tests and making sure nothing was broken, or ultimately fix the introduced bugs.

You might want to also be cautious, since it could lead to many more classes that can complicate your overall design, making a subjective rather than an objective decision.

[Return to Intro](./intro.md)