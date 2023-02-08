# Comments & Formatting

## Comments

Typically you want to avoid comments since they usuallly are redundant or can be misleading.

Thou, there are cases when comments can be good to add, such as including legal information, explanations which can't be replaced by good naming, warnings, todo notes, or documentation strings.

## Code Formatting

### Vertical Formatting

Your code should be nice to read, almost like an essay - top to bottom without too many "jumps".

Be aware if having too many functionalities in one unique file, make sure to have separation of code. You will also want to have blank lines within the files to help distinguish functionalities. Similar concepts should not be separated, different concepts should be separated. We should also consider keeping related concepts close to each other, when possible of course.

### Horizontal Formatting

- Avoid very long lines
- Use indentation
- Break statements into multiple shorter ones
- Use clear but not really long names

## Examples

### Bad example
```py
# (c) Maximilian Schwarzmüller / Academind GmbH

# *********
# Imports
# *********
from os import path, makedirs
from pathlib import Path

# *********
# Main
# *********
# A class which allows us to create DiskStorage instances


class DiskStorage:
    def __init__(self, directory_name):
        self.storage_directory = directory_name

    def get_directory_path(self):
        return Path(self.storage_directory)

    # This must be called before a file is inserted
    def create_directory(self):
        if (not path.exists(self.get_directory_path())):
            makedirs(self.storage_directory)

    # Warning: Directory must exist in advance
    def insert_file(self, file_name, content):
        file = open(self.get_directory_path() / file_name, 'w')
        file.write(content)
        file.close()
        # Todo: Add proper error handling


log_storage = DiskStorage('logs')

log_storage.insert_file('test.txt', 'Test')
```

### Improved Example
```py
# (c) Maximilian Schwarzmüller / Academind GmbH

from os import path, makedirs
from pathlib import Path

class DiskStorage:
    def __init__(self, directory_name):
        self.storage_directory = directory_name

    def get_directory_path(self):
        return Path(self.storage_directory)

    def create_directory(self):
        if (not path.exists(self.get_directory_path())):
            makedirs(self.storage_directory)

    # Warning: Directory must exist in advance
    def insert_file(self, file_name, content):
        file_path = self.get_directory_path() / file_name
        file = open(file_path, 'w')
        file.write(content)
        file.close()
        # Todo: Add proper error handling


log_storage = DiskStorage('logs')

log_storage.create_directory()
log_storage.insert_file('test.txt', 'Test')
```

[Return to Home](./README.md)