# コード例

このドキュメントでは、さまざまなプログラミング言語のシンタックスハイライトを実演します。

## JavaScript

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `こんにちは、私は\${this.name}で、\${this.age}歳です。`;
  }
}

const person = new Person('太郎', 30);
console.log(person.greet());
```

## Python

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"こんにちは、私は{self.name}で、{self.age}歳です。"

person = Person("太郎", 30)
print(person.greet())
```

## Go

```go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return fmt.Sprintf("こんにちは、私は%sで、%d歳です。", p.Name, p.Age)
}

func main() {
    person := Person{Name: "太郎", Age: 30}
    fmt.Println(person.Greet())
}
```

## Rust

```rust
struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn greet(&self) -> String {
        format!("こんにちは、私は{}で、{}歳です。", self.name, self.age)
    }
}

fn main() {
    let person = Person {
        name: String::from("太郎"),
        age: 30,
    };
    println!("{}", person.greet());
}
```

## TypeScript

```typescript
interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  greet(): string {
    return `こんにちは、私は\${this.name}で、\${this.age}歳です。`;
  }
}

const person = new Person('太郎', 30);
console.log(person.greet());
```

## SQL

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('太郎', 'taro@example.com');

SELECT * FROM users WHERE name = '太郎';
```

## Bash

```bash
#!/bin/bash

function greet() {
    local name=$1
    echo "こんにちは、$name！"
}

greet "世界"

for i in {1..5}; do
    echo "カウント: $i"
done
```
