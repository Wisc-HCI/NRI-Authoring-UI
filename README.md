# User interface for the NSF NRI Authoring environment.

This is the font end component of the NSF NRI AUthoring enviornment. Please read the article, 'Parametrization of “Therbligs”  for Specifying Manufacturing Tasks for Collaborative Robots' for a better understanding of this project.

The Authoring environment is set up as follows:

1 - Side Bar
2 - Task Environment
3 - Add Task Button
4 - Menu

[Authoring Environment] (docs/authoring\ environment.png)

## Side Bar




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
