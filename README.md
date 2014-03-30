JSON-API-Schema-Validation
==========================

Test suite for JSON API Response Schema validation.


js/model.js should be updated as follows : 

		 "urlsToProcess": [
		        {
		            "name": "Test API Name",
		            "url": "HTTP URL",
		            "fields": ["JSONPATH Expression 1", "JSONPATH Expression 2"],
		            "validate": "true/false (enable/disable validation for the API)"
		        },{
		            "name": "Date and Time API",
		            "url": "http://date.jsontest.com/",
		            "fields": ["milliseconds_since_epoch", "SOMETHING_FOR_FAIL","date"],
		            "validate": "true"
		        },{} ....
		    ]
		    
More information on JSONPATH Expression : http://goessner.net/articles/JsonPath/

TODO :
Code cleaning and formatting
Adding authentication
