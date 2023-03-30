# recipe_box
miniproject submission for codeacademy bootcamp purposes

```
Endpoint
```
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
