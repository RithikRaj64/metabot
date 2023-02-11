# Install Courier SDK: pip install trycourier
from trycourier import Courier

client = Courier(auth_token="pk_prod_4D92VBXAMX465GPJTXAV0ECXNAXQ")

resp = client.send_message(
    message={
        "to": {
            "email": "utmaginesh@gmail.com"
        },
        "content": {
            "title": "Welcome to Courier!",
            "body": "Want to hear a joke? {{joke}}"
        },
        "data": {
            "joke": "Why does Python live on land? Because it is above C level"
        }
    }
)
