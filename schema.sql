use delta_app;
create table user2(
    id varchar(50) primary key,
    username varchar(50) unique,
    email varchar(50) unique not null,
    password varchar(50) not null
);