
import java.net.URI;
import java.net.URISyntaxException;

import static spark.Spark.*;
import static spark.Spark.get;


public class Main {

  public static void main(String[] args) {
    String portNumber = System.getenv("PORT");
    port(portNumber != null ? Integer.valueOf(portNumber) : 8080);

    // your app goes here
    // http://sparkjava.com/

    awaitInitialization();
    System.out.println("READY");
  }

}
