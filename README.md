# User interface for the NSF NRI Authoring environment.
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

# Broswer
Open your browser and enter the url: https://localhost:8080
```

# Notes for testing with mico_master
In node-server.js, the default host name and local port will be local host and port 9999. If you want to access another computer, update the host name to that computer's corresponding IP address and port number.
