CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    username TEXT,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://imgs.search.brave.com/uB___kbtelg6dzqgTZYY353ogOmAhPrrRhO4cRA-Iz0/rs:fit:425:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5k/cFZnclh1TkFnRDBY/Vzg3RjdwLWlnSGFJ/USZwaWQ9QXBp');
INSERT INTO dishes (title, image_url) VALUES ('pudding', 'https://1.bp.blogspot.com/-TpUZm3F0B4Y/T0Wd-EtB9XI/AAAAAAAAAlE/ptnSwPFqiA8/s1600/CHocolate+bundt+slice+cropped+2.jpg');
INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://i.pinimg.com/736x/5a/67/52/5a67529c7aacbd49c0fc7cf37ba4e47b.jpg');
INSERT INTO dishes (title, image_url) VALUES ('Bahn Mi', 'https://images.dailyhive.com/20180517121125/11115728_745607882234040_801694177594312922_o.jpg');


INSERT INTO users (full_name, username, email, password_digest) VALUES ('Caleb Love', 'caleblove', 'caleblove@live.com', '$2b$10$A0S6ZTdOKnKWPZufyE7ozup7d3HJ/YJrMCBMYu9z6Vb0o4.HIGgJ6');