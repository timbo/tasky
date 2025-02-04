# Tasky
A simple task management app

## Structure

This project is divided into two sections. Each section has it's own `package.json` file and it's own dependancies. I recommend running this project in two separate terminal windows, one for the UI, and another for the API.

### Tasky API

Tasky's API was built using Nest.js and uses a simple array for data storage. Tasks will be lost when the server restarts.

For more details on how to use `tasky-api` see the [README](tasky-api/README.md).

### Tasky UI

Tasky's API was built using the React, create-react-app and Material UI. 

For more details on how to use `tasky-api` see the [README](tasky-ui/README.md).