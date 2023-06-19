GRANT ALL PRIVILEGES ON *.* TO 'mirimi'@'%';

use mirimi;
SELECT * FROM posts;
ALTER TABLE posts ADD comments INT DEFAULT 0;
DESC posts;
INSERT INTO posts (user_id, nickname, title, category, content, upload_date)
VALUES(2, '미림의 독개구리', '미림마이스터고의 실체 ㄷㄷ...', '학교', '기숙사 가면 6시 기상이래 ;;;', CURRENT_TIMESTAMP());

DESC reply;