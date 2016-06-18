CREATE TABLE "product"
(
    id SERIAL NOT NULL,
    name CHARACTER VARYING(20) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
);

INSERT INTO product(id, name, quantity) VALUES (1, 'apple', 5);
INSERT INTO product(id, name, quantity) VALUES (2, 'book', 7);
INSERT INTO product(id, name, quantity) VALUES (3, 'car', 2);