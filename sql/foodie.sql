DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE restaurants (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
     REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);


CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    commentText TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) 
      REFERENCES restaurants(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    
);