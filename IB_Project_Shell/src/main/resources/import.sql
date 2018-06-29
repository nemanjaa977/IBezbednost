INSERT INTO users (password, email, active) VALUES ('$2a$12$LtbYtEzOBdnsiD/E9Wtj2OEpK7kd3L7dHa5VoIzukKvjBWlReBAAW', 'user@example.com', true);
INSERT INTO users (password, email, active) VALUES ('$2a$12$LtbYtEzOBdnsiD/E9Wtj2OEpK7kd3L7dHa5VoIzukKvjBWlReBAAW', 'admin@example.com', false);

INSERT INTO authority (name) VALUES ('ROLE_REGULAR');
INSERT INTO authority (name) VALUES ('ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 2);
