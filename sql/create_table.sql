-- user : mirimi, password : 1234, db : mirimi
use mirimi;
DESC users;
CREATE TABLE users(
	user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(4) NOT NULL,
    email VARCHAR(20) NOT NULL,
    student_id VARCHAR(4) NOT NULL,
    nickname NVARCHAR(8) NOT NULL,
    password VARCHAR(255) NOT NULL,
    grade INT,
    class INT,
    num INT
);

CREATE TABLE posts(
	post_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    nickname VARCHAR(8) NOT NULL,
    title NVARCHAR(40) NOT NULL,
    category VARCHAR(8),
    content NVARCHAR(255) NOT NULL,
    img_url VARCHAR(255) DEFAULT NULL,
    upload_date DATETIME NOT NULL,
    post_views INT DEFAULT 0,
    likes INT DEFAULT 0,
	PRIMARY KEY(post_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);
DESC posts;

CREATE TABLE reply(
	reply_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	post_id INT NOT NULL,
    nickname NVARCHAR(8) NOT NULL,
    reply_content NVARCHAR(255) NOT NULL,
    reply_date DATETIME NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(post_id)
);

CREATE TABLE profile(
	profile_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    profile_img VARCHAR(255),
    book_barcode VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);
CREATE TABLE liked_post(
	user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(post_id) REFERENCES posts(post_id)
);
-- 아직 생성하지 않음-- 
CREATE TABLE liked_contest(
	user_id INT NOT NULL,
    contest_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(contest_id) REFERENCES contests(contest_id)
);