# Code Examples

This document demonstrates syntax highlighting for various programming languages.

## JavaScript

\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
}

const person = new Person('Alice', 30);
console.log(person.greet());
\`\`\`

## Python

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old."

person = Person("Alice", 30)
print(person.greet())
\`\`\`

## Go

\`\`\`go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return fmt.Sprintf("Hello, I'm %s and I'm %d years old.", p.Name, p.Age)
}

func main() {
    person := Person{Name: "Alice", Age: 30}
    fmt.Println(person.Greet())
}
\`\`\`

## Rust

\`\`\`rust
struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn greet(&self) -> String {
        format!("Hello, I'm {} and I'm {} years old.", self.name, self.age)
    }
}

fn main() {
    let person = Person {
        name: String::from("Alice"),
        age: 30,
    };
    println!("{}", person.greet());
}
\`\`\`

## TypeScript

\`\`\`typescript
interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  greet(): string {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
  }
}

const person = new Person('Alice', 30);
console.log(person.greet());
\`\`\`

## SQL

\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

SELECT * FROM users WHERE name = 'Alice';
\`\`\`

## Bash

\`\`\`bash
#!/bin/bash

function greet() {
    local name=$1
    echo "Hello, $name!"
}

greet "World"

for i in {1..5}; do
    echo "Count: $i"
done
\`\`\`
