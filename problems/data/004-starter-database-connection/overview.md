    
Implement an api using a [postgres](http://www.postgresql.org/) database.   
Following table with be pre-created with test data:
```
CREATE TABLE "product"
(
    id bigserial NOT NULL,
    name character varying(20) NOT NULL,
    quantity int NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)
```