# rest-proxy-ui
Small POC Web UI to work against the Confluent Open Source Rest Proxy API
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Setup Environemnt

### Apache httpd

Set up an apache httpd.

### Configuration

httpd.conf
```bash
[...]
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_http_module modules/mod_proxy_http.so
[...]

ProxyRequests Off
ProxyPreserveHost Off
ProxyPass /api/ <API Location>
ProxyPassReverse /api/ <API Location>
```

### Angular Applucation

Build Application
Move files from dist-Folder to your htdoc-Folder

Configure typical angular redirects....

Ready!

