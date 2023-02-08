# Naming

## Meaningful Names

Names should let you know what a variable, funciton, class, etc. does right away without having to look at the code. 

Well-named "Things" allow readers to understand your code without going through it in detail.

**Variables, Constants & Properties:** Use nouns or short phrases with adjectives describing what is inside these *data containers*.

**Functions & Methods:** Use verbs or short phrases with adjectives describing what these *commands* or *calculated values* are intended to do.

**Classes:** Use nouns or short phrases with nouns to describe the "things" you are creating.

Note: In Python and JavaScript you can use PascalCase to write classes, eg. AdminRole, UserRepository, and so on. Variables, functions, and methods are written in snake_case for Python, and JavaScript uses camelCase for those cases.

## Variables, Constants & Properties

When naming bollean data structures name it in such a way that you answer a question of true/false, such as

```
isActive
loggedIn
```

For other data structures you might want just to describe the value inside it.

```
name // Contains a String
age // Contains an Integer

user // Contains an Object
authenticatedUser // Sometimes more details is better
```
## Functions & Methods

Functions that computes a Boolean you might want to name it answering a true/false question, such as:

```
isValid(...)
emailIsValid(...) // Again, more descriptive names might be good idea
purchase.isPaid()
```

For the resto of the functions that performs an operation, you might just want to describe the operation

```
getUser(...)
getUserByEmail(...) // More descriptive name
response.send()
```

## Classes

SInce classes deal only with "thinkgs" that are instantiated, we might just want to pick names that describe the object. Some examples are:

```
User
Product
Customer
```

## Example One

### Bad Naming
```py
from datetime import datetime


class Entity:
    def __init__(self, title, description, ymdhm):
        self.title = title
        self.description = description
        self.ymdhm = ymdhm


def output(item):
    print('Title: ' + item.title)
    print('Description: ' + item.description)
    print('Published: ' + item.ymdhm)


summary = 'Clean Code Is Great!'
desc = 'Actually, writing Clean Code can be pretty fun. You\'ll see!'
new_date = datetime.now()
publish = new_date.strftime('%Y-%m-%d %H:%M')

item = Entity(summary, desc, publish)

output(item)
```

### Clean Naming

```py
from datetime import datetime


class BlogPost:
    def __init__(self, title, description, date_published):
        self.title = title
        self.description = description
        self.date_published = date_published

    def print(self):
        print('Title: ' + self.title)
        print('Description: ' + self.description)
        print('Published: ' + self.date_published)


title = 'Clean Code Is Great!'
description = 'Actually, writing Clean Code can be pretty fun. You\'ll see!'
now = datetime.now()
formatted_date = now.strftime('%Y-%m-%d %H:%M')

blog_post = BlogPost(title, description, formatted_date)
blog_post.print()
```

## Example Two

### Bad Naming

```py
class Point:
    def __init__(self, coordX, coordY):
        self.coordX = coordX
        self.coordY = coordY


class Rectangle:
    def __init__(self, starting_point, broad, high):
        self.starting_point = starting_point
        self.broad = broad
        self.high = high

    def area(self):
        return self.broad * self.high

    def end_points(self):
        top_right = self.starting_point.coordX + self.broad
        bottom_left = self.starting_point.coordY + self.high
        print('Starting Point (X)): ' + str(self.starting_point.coordX))
        print('Starting Point (Y)): ' + str(self.starting_point.coordY))
        print('End Point X-Axis (Top Right): ' + str(top_right))
        print('End Point Y-Axis (Bottom Left): ' + str(bottom_left))


def build_stuff():
    main_point = Point(50, 100)
    rect = Rectangle(main_point, 90, 10)

    return rect


my_rect = build_stuff()

print(my_rect.area())
my_rect.end_points()
```

### Clean Naming

```py
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Rectangle:
    def __init__(self, origin, width, height):
        self.origin = origin
        self.width = width
        self.height = height

    def get_area(self):
        return self.width * self.height

    def print_coordinates(self):
        top_right = self.origin.x + self.width
        bottom_left = self.origin.y + self.height
        print('Starting Point (X)): ' + str(self.origin.x))
        print('Starting Point (Y)): ' + str(self.origin.y))
        print('End Point X-Axis (Top Right): ' + str(top_right))
        print('End Point Y-Axis (Bottom Left): ' + str(bottom_left))


def build_rectangle():
    rectangle_origin = Point(50, 100)
    rectangle = Rectangle(rectangle_origin, 90, 10)

    return rectangle


rectangle = build_rectangle()

print(rectangle.get_area())
rectangle.print_coordinates()
```

[Return to Home](./README.md)