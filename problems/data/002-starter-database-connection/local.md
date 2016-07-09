
This challenge requires a <a target="_blank" href="https://www.postgresql.org/">postgres database</a>.  
Once you install <a target="_blank" href="https://www.docker.com/">Docker</a> you can use below commands and images.  

For this challenge we have created a `restcoder/postgres_starter` image.  
It contains a postgres database with pre-created `product` table and seeded data from the challenge overview.

Open your terminal and run: 
<pre><code><span class="nv">$ </span>docker run -it --rm -p 5432:5432 restcoder/postgres_starter</code></pre>   

If you press `CTRL+S` it will interrupt the process and remove the docker container automatically.  

After you checkout your code you will have to set the `POSTGRES_URL` variable in the `.env` file.  
The CLI can do it automatically. Run below command under your project directory (`starter-database-connection`).  

<pre><code><span class="nv">$ </span>restcoder set postgres</code></pre>
