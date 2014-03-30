var model = {
    "urlsToProcess": [
        {
            "name": "Header API test",
            "url": "http://headers.jsontest.com/",
            "fields": ["Accept-Language", "Host"],
            "validate": "true"
        },{
            "name": "Date and Time API",
            "url": "http://date.jsontest.com/",
            "fields": ["milliseconds_since_epoch", "SOMETHING_FOR_FAIL","date"],
            "validate": "true"
        }
    ]
};