var http = require('http');
http.createServer(function (req, res) { 
	var resultsPool = [{
                'id': '1',
                'title': 'house1',
                'img': 'https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg',
                'location':'San Bruno'
            }, {
                'id': '2',
                'title': 'house2',
                'img': 'https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg',
                'location':'San Bruno'
            },
            {
                'id': '3',
                'title': 'house3',
                'img': 'https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg',
                'location':'Palo Alto'
            }

            ];
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(JSON.stringify(resultsPool, 0, 4));
  res.end();
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');