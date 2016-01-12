Implement a route that returns a result of the [Fizz buzz](https://en.wikipedia.org/wiki/Fizz_buzz) game.  
Rules are very simple:
- If the `number` is divisible by 3 return the word **fizz**.
- If the `number` is divisible by 5 return the word **buzz**.
- If the `number` is divisible by 15 return the word **fizzbuzz**.
- If the `number` is not divisible by 3 or 5 return the `number`.

Additionally if the `number` is not a valid number return an error response `{"error": "number is invalid"}` with the status code `400`.