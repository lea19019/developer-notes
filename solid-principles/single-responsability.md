# Single Responsability Principle (SRP)

Every software componenet should have one and only one responsability. A componenet can be a class, a method, or a module.

Thou, the phrase Bob Martin used in his book was, "Every software componenet should have one and only one reason to change".
When software components have more than one reason to change, for example a class that deals with students and is in charge of making an id and openning a db connection to save that id would have to take care of those two thing.

The more reasons to change the higher the chances to introduce bugs, and the previous example it would be best if one class is in charge of the students id's and another of the db connection.

## Cohesion and Coupling

Cohesion is the degree to which the various parts of a software component are related. Higher cohesion helps attain better adherence to the Single Responsability Principle.

Coupling is defined as the level of inter dependency between various software components. Loose coupling helps attain better adherence to the Single Responsability Principle.

[Return to Intro](./intro.md)