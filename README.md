# recipe_box
miniproject submission for codeacademy bootcamp purposes


**Tech stack :**
```
1. Node.js
2. Express (Node.js framework)
3. Postgres (DBMS)
4. Sequelize (ORM)
5. EJS (Template Engine)
6. Bootstrap (css framework)
7. Jsonwebtoken (auth)
8. Bcryptjs (password hashing)
9. Cookie-parser
```


**How to use :**
```
1. git clone github.com/ramadhantaAkmal/recipe_box
2. npm install
3. npx sequelize-cli db:create
4. npx sequelize-cli db:migrate && sequelize-cli db:seed:all
5. create .env
5. npm start
```

**.env file :**
```
TOKEN_KEY = ""freefiled""
PORT = 3000
```


**Endpoint :**
| Method | Endpoints             | Keterangan                                  |  Auth |
| ------ | --------------------- | ------------------------------------------- |  ---- |
| GET    | /                     | manampilkan landing page berisi data recipes|  no   |
| GET    | /home                 | manampilkan home page berisi data recipes   |  yes  |
| GET    | /login                | manampilkan login page                      |  no   |
| GET    | /register             | menampilkan register page                   |  no   |
| POST   | /login                | melakukan login                             |  no   |
| POST   | /register             | melakukan register                          |  no   |
| GET    | /logout               | keluar dari sistem                          |  no   |
| GET    | /recipes              | menampilkan recipes dari user               |  yes  |
| POST   | /recipes              | menambahkan data recipes oleh user          |  yes  |
| GET    | /recipes/add          | menampilkan add page recipe                 |  yes  |
| GET    | /recipes/:id          | menampilkan detail recipes                  |  yes  |
| GET    | /recipes/update/:id   | menampilkan update page                     |  yes  |
| POST   | /recipes/update/:id   | mengubah data recipes                       |  yes  |
