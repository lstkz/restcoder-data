    
Implement an API using a [postgres](http://www.postgresql.org/) database.   
Following table will be pre-created with test data:
```
CREATE TABLE "product"
(
    id SERIAL NOT NULL,
    name CHARACTER VARYING(20) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
);
```

Use below script to insert sample data used in examples:
```
INSERT INTO product(id, name, quantity) VALUES (1, 'apple', 5);
INSERT INTO product(id, name, quantity) VALUES (2, 'book', 7);
INSERT INTO product(id, name, quantity) VALUES (3, 'car', 2);
```
