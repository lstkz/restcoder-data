Create a basic proxy with redis caching support.   
Your application should catch all `GET` requests and call provided `PROXY_API_URL` with exact pathname and query string.  
Implement it according to the following algorithm:
- Use pathname and query string as a key. For example: `/some-path/subpath?foo=bar&anotherparam=1`
- If key already exists in Redis return a stored response. Don't change anything in Redis.
- If key doesn't exist, call the proxy:
    - If response is successful (200 status code), store the response body in Redis and return it.
    - If response is not successful (>299 code) or Proxy API cannot be connected, return a `502` status code. Don't store anything in Redis.

Additionally cached responses should autoexpire after 5 seconds.

You can assume:
- Only `GET` requests will be tested and url will be always valid.
- Proxy API will always return a JSON response (less than 1KB).
- You can use any commands in Redis.
- You must call exactly the same URL. Don't change order of query parameters.
- You must return only the response from Proxy API. No need to return same response headers.
