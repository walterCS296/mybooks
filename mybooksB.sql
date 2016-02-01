CREATE TABLE author_rate
(   author_rate_id tinyint unsigned not null primary key,
    author_rate_description text
);

CREATE TABLE book_covers
(   isbn char(13) not null primary key,
    cover_image blob not null
);

CREATE TABLE book_rate
(   book_rate_id tinyint unsigned not null primary key,
    book_rate_description text
);

CREATE TABLE classifications
(   class_id tinyint unsigned not null auto_increment primary key,
    class_name char(50) not null,
    class_description text
);