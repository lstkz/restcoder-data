Build a system for room reservation. Your application should perform atomic (transactional) operations  and should keep all the data consistent.  
You can assume there will be ~40 concurrent requests for the same room reservation.  

Room has following schema:
- `name:String` The name of the room.
- `spots:Number` The number of available spots, it cannot be less than 0.

If `spots` is 1 and two requests try to make a reservation one of the request should fail with an error.  
A single user can perform multiple reservation on the same room.  
You can assume all strings will be in lowercase (room name and username) and all input data will be valid.  