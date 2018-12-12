
var requestify = require('requestify')


exports.get = path=>{
    return new Promise((r,j)=>{
        // path 

        requestify.post('http://localhost:8880/', { })
            .then(function(response) {
                r(response.body)
                console.log(response.body)
            });

    })
}

exports.set = (path,text) =>{
    
}


requestify.post('http://localhost:8880/save', { path: '/', text: '1sdfr23r2311111111111aaaaaaaaaaaa32323n\n' })
	.then(function(response) {
		// Get the response body (JSON parsed or jQuery object for XMLs)
		//response.getBody();
		
		// Get the raw response body
		console.log(response.body)
    });
    

    // requestify.post('http://localhost:8880/', { })
	// .then(function(response) {
	// 	// Get the response body (JSON parsed or jQuery object for XMLs)
	// 	//response.getBody();
		
	// 	// Get the raw response body
	// 	console.log(response.body)
    // });