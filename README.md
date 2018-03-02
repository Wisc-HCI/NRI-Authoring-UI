# User interface for the NSF NRI Authoring environment.

** Work in Progress **

Live demo at: http://nri-authoring-ui.herokuapp.com/

```sh
# Pre-setup
brew install node

# Setup
npm install

# For Ubuntu users, an extra install command is needed for jspm. (Tested on Ubuntu 16)
sudo npm install jspm && jspm install

# Get Live-Server 
sudo npm install live-server

# Run Using
$ live-server ./app
```

** To test with mico_master.py **
```sh
# Pre-setup
brew install node

# Setup
npm install

# Run Using
node node-server.js
```

# Notes for testing with mico_master
1. In node-server.js, update host name and local port to your local host name and the port you want to test on.
2. The application will break if mico_master is not running
3. If updating the JSON object, update the length variable as well. The python server will expect a length + object.
