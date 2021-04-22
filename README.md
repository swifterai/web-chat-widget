<div style="text-align:center">
  <img width="800px" src="https://raw.githubusercontent.com/swifterai/web-chat-widget/main/demo-capture.PNG"  alt="chat widget demo">
</div>
<br>

# Web Chat Widget 

This is a web chat widget component, based on the project https://github.com/beeman/angular-elements-chat-widget
by Bram Borggreve https://github.com/beeman

Is is built using Angular Custom Elements - from the WebComponents spec,
this means that the widget can be integrated on any website!

The widget can be configured to work with any AI agents API endpoints.

## Project Structure

The project is a standard Angular 9 project with a few additions:

```
src/app/element.module.ts   Module with the component to be used as Angular Element. Imported by App Module
src/main.element.ts         bootstrap the Element Module
src/polyfills.element.ts    polyfills for the Element Module
build-elements.js           script to generate the exported file and demo project
```

<!-- GETTING STARTED -->
## Getting Started

The component can be developed as any other Angular component.

### Prerequisites

For *development* you will need to have the following:

* node version 12
* npm

### Instalation and running

### Step 1. Install modules
From a terminal, navigate to the project folder and run => ```npm install```

### Step 2. Update Configs

In the application's `src/environments` folder there are 2 config files (environment.ts and environment.prod.ts).

When testing locally use a test endpoint for the apiUrl or overwrite the environment with the configuration for prod: ```https://<domain.com>/<api-endpoint>```

### Step 3. Run the test widget

To run the project locally run => ```npm run start``` from the project folder. This will start the Angular app in development mode, using the configs found in the environment.ts file.

Navigate to => `http://localhost:4202/`.


## Build

The build configuration of the Angular Elements is defined in a separate project in `angular.json`. 

You can run this configuration with => `npm run build:elements`. It creates a build in `dist/elements-build` that only contains `ElementModule`. 

After the build, the `build-elements.js` script creates the final js `chat-widget.js` file in `dist/elements`.

To change the target of the compiled js file to either `es5` or `es2015`, update the `"postbuild:elements"` script in `package.json`. Default it creates an `es2015` file.

Include the `chat-widget.js` file on you webpage before the end of `</body>` tag and start using your custom chat assistant.

```
 <script>
    const config = document.getElementById('config')
    const widget = document.getElementById('widget')
    widget.merchantId = '[unique-id-of-the-merchant]';  
    widget.appEnv = 'prod';                             
    widget.agentEnv = 'prod';
    widget.agentAvatar = '[uri-to-image]';
    config.addEventListener('themeChange', (evt) => widget.theme = evt.detail)
  </script>
```

See `demo.html` file for an example.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/swifterai/web-chat-widget/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

One can contribute by creating *pull requests*, or by opening *issues* for discovered bugs or desired features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Developers

The [Swifter AI team](https://swifter.ai/).
