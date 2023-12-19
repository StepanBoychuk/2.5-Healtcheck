# Getting started

You can start script with following command:
```
docker-compose build
docker-compose up
```

# Usage
## '/random'
When you'll send GET request to '/random' endpoint, you will receive answer depending on the responce from 'yesno.wtf' API.
If 'yesno.wtf' responce with yes, you will receive:
```
{
   "result": true 
}
```
If responce no:
```
{
    "result": false
}
```
And if responce is maybe:
```
{
    "result": "maybe"
}
```
With status code 500

## '/healthz'
When you'll send GET request to '/healthz' endpoint, you'll receive answer depending on connectivity with 'yesno.wtf' domain.
It return status code 200 if service can access.
And return status code 500 if service can not.