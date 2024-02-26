# Library server

site \
https://ernur.proj.kz/

```
admin user
email: ernur@ernur
password: ernur
```

## Authentication

### Register
```
POST
https://fine-pink-springbok-toga.cyclic.app/auth/register
```

```
Request body:
{
    "email": "example@mail",
    "password": "example"
}
```

### Activate account

```
GET
https://fine-pink-springbok-toga.cyclic.app/auth/activate/:link
```

---

### Login

```
POST
https://fine-pink-springbok-toga.cyclic.app/auth/login
```

```
Request body:
{
    "email": "example@mail",
    "password": "example"
}
```
Server will send cookie: `refreshToken`

---

### Refresh

```
GET
https://fine-pink-springbok-toga.cyclic.app/auth/refresh
```
Request cookie: `refreshToken`
New refresh token will be set to cookie

---

### Logout
```
POST
https://fine-pink-springbok-toga.cyclic.app/auth/logout
```

---

---

### Get user info
```
GET
https://fine-pink-springbok-toga.cyclic.app/user
```

### Add book to user books
```
POST
https://fine-pink-springbok-toga.cyclic.app/user/books
```

### Delete book from user books
```
DELETE
https://fine-pink-springbok-toga.cyclic.app/user/books/:id
```

### Get user lists
```
POST
https://fine-pink-springbok-toga.cyclic.app/user/lists
```

---

### Get books by publisher
```
GET
https://fine-pink-springbok-toga.cyclic.app/books/publisher/:publisher
```

### Get books by author
```
GET
https://fine-pink-springbok-toga.cyclic.app/books/author/:author
```

### Get books by category
```
GET
https://fine-pink-springbok-toga.cyclic.app/books/category/:category
```

### Get books by title
```
GET
https://fine-pink-springbok-toga.cyclic.app/books/title/:title
```

### Get books by id
```
GET
https://fine-pink-springbok-toga.cyclic.app/books/id/:id
```

### Get main page books 
```
GET
https://fine-pink-springbok-toga.cyclic.app/books/main-page
```


### Add main page books 
```
POST
https://fine-pink-springbok-toga.cyclic.app/books/main-page
```

### Delete main page book
```
DELETE
https://fine-pink-springbok-toga.cyclic.app/books/main-page/:id
```
