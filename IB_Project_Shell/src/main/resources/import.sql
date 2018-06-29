INSERT INTO users (password, email, active) VALUES ('$2a$10$QS6U4qo/.2uWnFekV9MpmemqOvBtJAjvX1kGQtTXWohBV4rEkLsCS', 'user', true);
INSERT INTO users (password, email, active) VALUES ('$2a$10$QS6U4qo/.2uWnFekV9MpmemqOvBtJAjvX1kGQtTXWohBV4rEkLsCS', 'admin', true);

INSERT INTO authority (name) VALUES ('ROLE_REGULAR');
INSERT INTO authority (name) VALUES ('ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 2);
