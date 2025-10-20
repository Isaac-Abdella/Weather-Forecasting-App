# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

There are also additional installations required for running the App. 

## Installing Lodash 
To install Lodash in your React + Vite project, you can use npm or yarn. Here are the commands for both package managers:   
Using npm:
```bash
npm install lodash
```

## Installing npm react-router-dom
To install react-router-dom in your React + Vite project, you can use npm. Here is the commands for npm package manager:   
Using npm:
```bash
npm install react-router-dom.

```

The App contains components and some pages together which are run from App.jsx file. 

There will be a need of .env file with a Open Weather API key to run the weather related functionality in the App.

Create a .env file in the root directory of your project and add the following line, replacing YOUR_API_KEY with your actual Open Weather API key:
```env
VITE_WEATHER_API_KEY=YOUR_API_KEY
```

This will make the API key available in your Vite application as an environment variable. And be able to pull weather data from Open Weather API. 

Thank you,

Yisehak (Isaac) Abdella.

