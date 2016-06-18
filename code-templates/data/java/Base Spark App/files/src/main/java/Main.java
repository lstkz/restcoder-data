
import java.net.URI;
import java.net.URISyntaxException;

import static spark.Spark.*;
import static spark.Spark.get;


public class Main {

  public static void main(String[] args) {
    port(Integer.valueOf(System.getenv("PORT")));

    // your app goes here
    // http://sparkjava.com/

    awaitInitialization();
    System.out.println("READY");
  }

}
