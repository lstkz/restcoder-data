
Implement same API from **Starter: Database connection**, but you must initialize the database schema manually in your code.  
Your application will be deployed in cluster. Each instance will receive a `INSTANCE_NR` environmental variable.  
For first instance `INSTANCE_NR` will equal to `0`.  
For second instance `INSTANCE_NR` will equal to `1`.  
and so on  
  
  
Initialize database only if `INSTANCE_NR` is `0` and before your print `READY` to stdout.

Following table must be created:
```
CREATE TABLE "product"
(
    id SERIAL NOT NULL,
    name CHARACTER VARYING(20) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)
```

Test data will be inserted by tester. 