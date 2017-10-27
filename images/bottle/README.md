## Python Bottle Application
This application runs in a Docker container. It's purpose is to be a simple application that can be started locally using Docker, or with a more complex deployment, such as a Kubernetes system.

### Building and Running Locally
To build the application, do the following:

`make build`

To run the application, do the following:

`make run`

### Test Application Locally
Once the app is running, you may access it by the following URL:

`http://0.0.0.0/api/`

### Deploy to Kubernetes
The application includes a simple Kubernetes deployment config that may be used on Google's Container Engine. To deploy the application using a dynamically assigned external IP4 address, do the following:

```

```