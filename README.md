# products-api

## Error: Client contains very weird issue related to pinia
    - Store returns proxy object wrapping ref object which contains store data needed for application
    - trying accessing value (data in the store) resulted returning 'undefined'
    - only way to get data was to destructure proxy object or wrapping is JSON parse/stringify
        - doing it so resulted loosing reactivity on the state variable that makes it useless
    
    - after 6 hours of debugging and searching documentations of pinea and vue no result was made towards fixing the issue so in the frontend part only home page and product details pages are implemented

## API (express + mongodb): 
    - api contains several features that was not requested in the task but was needed (i thought so) to implement
        - user manipulation: user manipulations ednpoints are fully handled in the api such as /login, /signup, /       re-new-access-token
        - for security reasons JWT functionality was implemented to authenticate users and also protect some protected routes such as /orders (because they should be user specific and no other user should see someone elses orders). that was done so by implementing custom jwt utils and middleware.
        - products: product creation, getting all products (pagination included), getting single product, buying product and so on.
        - orders: for orders only order creation and order fetching are allowed. 
        - custom middleware for handling incomming file uploads easily just by including it as a next middleware
        - uploads: simple endpoint to handle image fetching request and send them to the users
    - api is implemented using MVC pattern