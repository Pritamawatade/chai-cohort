
---

## 📘 MongoDB Aggregation Pipeline: A Beginner's Guide  

> 🚀 This guide is based on hands-on practice and curated explanations from tutorial videos. It covers key MongoDB aggregation concepts, operators, and real-world examples to help you understand and apply pipelines effectively.

---

### 🔧 Initial Setup

Before diving into aggregation pipelines, let’s set up the environment:

1. **Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**.
2. **Create a new database and a collection named `users`**.
3. **Give database and network access** (Allow access from anywhere).
4. **Install MongoDB VS Code Extension**.
5. **Get the connection string from Atlas and add it to the extension**.
6. **Import dummy data** from: [gist.github.com/hiteshchoudhary](https://gist.github.com/hiteshchoudhary).

---

### 📚 Basic Aggregation Concepts

- An **aggregation pipeline** processes data records as they pass through multiple stages.
- Each stage transforms the documents and passes the results to the next stage.
- Think of it like a conveyor belt: filter ➝ group ➝ sort ➝ reshape ➝ return.

---

## 🧪 Aggregation Pipeline Stages

---

### 1️⃣ `$match`

Used to **filter documents**, just like `WHERE` clause in SQL.

```js
[
  { $match: { isActive: true } },
  { $count: 'activeUsers' }
]
```

👉 Filters all users who are active and counts them.

---

### 2️⃣ `$group`

Used to **group documents** by a specific field and perform operations on them (e.g., `$sum`, `$avg`).

#### 📌 Find the average age of all users:
```js
[
  {
    $group: {
      _id: null,
      averageAge: { $avg: "$age" }
    }
  }
]
```

🧠 `_id: null` means all documents are grouped together.

#### 📌 Top 2 most common fruits:
```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 2 }
]
```

---

### 3️⃣ `$sort`

Sort documents:
- `1`: ascending
- `-1`: descending

---

### 4️⃣ `$limit`

Restricts the number of output documents.

---

### 5️⃣ `$unwind`

Deconstructs an array field from the input documents to output a document for **each element**.

#### Example:

```js
[
  { $unwind: "$tags" },
  {
    $group: {
      _id: "$_id",
      numberOfTags: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: null,
      avgNumberOfTags: { $avg: "$numberOfTags" }
    }
  }
]
```

---

### 6️⃣ `$addFields`

Adds or reshapes fields in documents.

#### Example:

```js
[
  {
    $addFields: {
      numberOfTags: {
        $size: { $ifNull: ["$tags", []] }
      }
    }
  }
]
```

✔️ `ifNull` prevents errors when the `tags` field doesn't exist.

---

### 7️⃣ `$project`

Used to **include, exclude, or transform fields**.

```js
[
  {
    $match: {
      isActive: false,
      tags: "velit"
    }
  },
  {
    $project: {
      name: 1,
      age: 1
    }
  }
]
```

---

### 8️⃣ `$lookup`

Joins documents from another collection (like a SQL `JOIN`).

#### Example:

```js
[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0]
      }
    }
  }
]
```

> 🔍 Use `$arrayElemAt` or `$first` to extract the first matched document from the joined array.

---

## 🧠 Common Questions & Examples

---

### ❓ How many users have "enim" in their tags?

```js
[
  { $match: { tags: "enim" } },
  { $count: "enimUsers" }
]
```

---

### ❓ Users with phone number starting with +1 (940):

```js
[
  { $match: { "company.phone": /^\+1 \(940\)/ } },
  { $count: "usersWithNumbers" }
]
```

---

### ❓ Who registered most recently?

```js
[
  { $sort: { registered: -1 } },
  { $limit: 4 },
  {
    $project: {
      name: 1,
      age: 1,
      registered: 1
    }
  }
]
```

---

### ❓ Group users by favorite fruit and list names and ages:

```js
[
  {
    $group: {
      _id: "$favoriteFruit",
      users: { $push: "$name" },
      agedUsers: { $push: "$age" }
    }
  }
]
```

💡 `users` and `agedUsers` are **new fields** being created.

---

### ❓ Users with `"ad"` as the **second** tag:

```js
[
  { $match: { "tags.1": "ad" } },
  { $count: "UsersWithAdTag" }
]
```

---

### ❓ List of users who have both "enim" and "id" in tags:

```js
[
  {
    $match: {
      tags: { $all: ["enim", "id"] }
    }
  }
]
```

---

### ❓ Companies in the USA with user counts:

```js
[
  { $match: { "company.location.country": "USA" } },
  {
    $group: {
      _id: "$company.title",
      userCount: { $sum: 1 }
    }
  }
]
```

---

## 🔍 Summary of Important Operators

| Operator       | Purpose                                                                 |
|----------------|-------------------------------------------------------------------------|
| `$match`       | Filters documents based on a condition                                  |
| `$group`       | Groups documents and performs aggregations like sum, avg, count         |
| `$sort`        | Sorts documents based on a field                                        |
| `$limit`       | Limits the number of output documents                                   |
| `$unwind`      | Breaks an array into separate documents                                 |
| `$addFields`   | Adds or modifies fields in documents                                    |
| `$project`     | Includes, excludes, and transforms fields                               |
| `$lookup`      | Performs a left outer join with another collection                      |

---

## 🚀 Pro Tips

- Always test your pipeline stage-by-stage for clarity.
- Use [MongoDB Playground](https://www.mongodb.com/products/tools/vscode) in VS Code for real-time execution.
- Wrap strings with quotes `" "` when referring to field names; no quotes needed for new field creation.
- Use `$all` for array matching and `$regex` for advanced text searches.
- `$group` does not maintain order — use `$sort` after grouping if needed.

---


---

## 👤 Author  

This guide was created by **Pritam Awatade**.  

- 🐦 Twitter: [@pritam_awatade](https://X.com/pritam_awatade)  
- 💻 GitHub: [pritamawatade](https://github.com/pritamawatade)  

---  
