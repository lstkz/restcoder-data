    
Implement an api using a [postgres](http://www.postgresql.org/) database.   
Following table with be pre-created with test data:
```
CREATE TABLE "product"
(
    id SERIAL NOT NULL,
    name CHARACTER VARYING(20) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)
```