trong cái data gửi lên server cuối cùng nó sẽ bao gồm ???
-userId
-cartItems
-Time start
-Complete: false

cart => login => register => login => (phải về lại trang cart không được về lại trang register)

Luồng làm việc của favorite:

1. Table favorites : {
   id: userID
   favoriteIds: []
   }
2. Tao FavoriteSlice
   getById =>
