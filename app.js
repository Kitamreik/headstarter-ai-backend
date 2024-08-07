import express from 'express';
import morgan from 'morgan';
import crypto from 'crypto'; //This package is no longer supported. It's now a built-in Node module. If you've depended on crypto, you should switch to the one that's built-in. //Docs re: crypto - https://nodejs.org/docs/latest-v7.x/api/crypto.html#crypto_crypto
const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(express.json());


app.get('/', (request, response, next) => {
 response.status(200).json({success: {message: "Index successful"}, statusCode: 200});

});

app.post("/api/chat", (request, response, next) => {
     //Handling client and server errors: It is common to create a helper function to check that the response contains no client (4xx) or server (5xx) error responses:
     const checkStatus = response => {
        if (response.ok) { // response.status >= 200 && response.status < 300
            return response
        } 
    }
     // ======== Hash them to get the Authorization token ======== 
     
     //Determine if there is still crypto support or unavailable
     try {
         console.log('crypto support is enabled!'); //success
     } catch (err) {
         console.log('crypto support is disabled!');
     }
 
     let apiHeaderTime = Math.floor(Date.now()/1000); 
     console.log(`apiHeaderTime=[${apiHeaderTime}]`); //apiHeaderTime=[1714710175]
     
     let sha1Algorithm = "sha1"; 
     let sha1Hash = crypto.createHash(sha1Algorithm);
     console.log(sha1Hash)
    // ======== Send the request and collect/show the results ======== 
    //fetch on GitHub: https://github.com/node-fetch/node-fetch
    //const fetch = require('node-fetch'); //Update code to use native Fetch, so this is deactivated. Run npm uninstall node-fetch

    let options = 
    {  method: "post",
    //body: JSON.stringify(body),
    headers: { 
        "Content-Type": "application/json", //uncommented for testing
        "X-Auth-Date": ""+apiHeaderTime,
    },
    };

    const url = "http://localhost:3001/api/chat"
     //Handling client and server errors:
     try {
        checkStatus(response);
        console.log("Final Response check cleared, the resource is available.")
       
        console.log("The fetched components:", url, options)
        //fetch(url, options) //WILL create loop and overload server
    } catch (error) {
        console.log(error, "Response check error catching");
    }
    
    response.status(200).json({success: {message: "Api data route success"}, data: {url, options}, statusCode: 200});
});


//Server
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`)
});