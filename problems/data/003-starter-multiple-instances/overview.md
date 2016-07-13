
Implement the same API from **Starter: Database connection** and you must initialize the database schema manually in your code.  
Your application will be deployed in cluster. Each instance will receive a `FOREMAN_WORKER_NAME` environmental variable.  
The first web instance will receive a `web.1` value.  
The second web instance will receive a `web.2` value.  
and so on...  
  
  
Initialize the database only if `FOREMAN_WORKER_NAME` is `web.1` and before your print `READY` to stdout.

Following table must be created:
```
CREATE TABLE "product"
(
    id SERIAL NOT NULL,
    name CHARACTER VARYING(20) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
);
```

Test data will be inserted by tester. 