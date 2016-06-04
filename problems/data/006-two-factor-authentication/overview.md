
Implement a simple user authentication system with two-factor authentication support.  
Your solution must be only compatible with [Google Authenticator](https://support.google.com/accounts/answer/1066447).  
Please check the Key Uri format specification [here](https://github.com/google/google-authenticator/wiki/Key-Uri-Format).  
Your application will have to generate a URI and encode it as a QR code.   

URI has the following format:  
`otpauth://TYPE/LABEL?PARAMETERS`  
Please make following assumptions:  
1. The `TYPE` must be the Time-Based One-time Password (TOTP) algorithm defined in [RFC 6238](https://tools.ietf.org/html/rfc6238).
2. The `LABEL` must be the username of the associated user.
3. The `issuer` parameter must be always equal to `RestCoder`.
4. The `secret` parameter must be encoded in Base32. The original decoded ASCII secret must have exactly 32 characters.
The secret must randomly generated and unique for all users.
5. Don't include any additional query parameters.
6. Use default options from [Google Authenticator](https://github.com/google/google-authenticator/wiki/Key-Uri-Format):
     - Algorithm: `SHA1`
     - Digits: `6`
     - Period: `30` (seconds)
     
Example URI:
```
otpauth://totp/user2?secret=GVHH2W2DONZVMOZBNZMGSUCPJESSGL2KORXUYNSTOZFGE3CMINQQ&issuer=RestCoder
```

Encoded QR code:  
![QR Code](https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/006-qr-code.png)

If you scan above code in Google Authentication, you should see the following result:  
![Google Authentication](https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/006-result.png)



Additionally implement a [JWT authentication](https://jwt.io/).  
Token returned by the `POST /login` endpoint must be sent in the `authorization` header in format `authorization: JWT <your_token>`.  
You can use any payload, but you should be able to identity a specific user.