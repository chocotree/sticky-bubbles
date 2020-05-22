### learn from here

- https://www.youtube.com/watch?v=5575fjFzPT0


### demo

- https://istree-sticky-bubbles.surge.sh/

<br/>

---

## how to write webpack config files in Typescript

- [a medium blog post](https://medium.com/webpack/unambiguous-webpack-config-with-typescript-8519def2cac7)

- [read webpack docs here](https://webpack.js.org/configuration/configuration-languages/#typescript)

    ### conclusion 🔻
    Actually, just install ts-node and change webpack.config.js to .ts file,
    and update import, export syntax, that's it!<br/>

    We can still use the original npm script like:

    <span style="color: #6a9955;">// just a basic example 👀</span></br>
    "build": "webpack --mode production".
    
    Because we installed the ts-node package, and webpack just need that to use webpack.config.ts file!

<br/>

## How to pass env file variable to webpack config
- [stackoverflow](https://stackoverflow.com/questions/46224986/how-to-pass-env-file-variables-to-webpack-config)

    usage
    ```
    console.log(process.env);
    ```