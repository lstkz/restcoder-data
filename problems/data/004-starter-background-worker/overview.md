
Create an application that will contain a web process and a background worker.  
The background worker should do following things:
1. Read data from the postgres database.
2. Compute sum of all `quantity` (return `0` if there are no elements).
3. Insert a computed value to [Redis](http://redis.io/commands) (override a previous value).
4. Sleep 1 second.
5. Repeat step 1.

Rest API (web process) will expose only a single route that returns a computed value by the background worker.

You can assume that the following table will be pre created  with test data.
```
CREATE TABLE "product"
(
    id SERIAL NOT NULL,
    name CHARACTER VARYING(20) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)
```


Your Procfile must contain two lines:
```
web: <startup script>
worker: <worker script>
```

An example for nodejs:
```
web: node app.js
worker: node worker.js
```
