module.exports = {
    devtool: "source-map",
    entry: "./app.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [ { test: /\.tsx?$/, loader: "ts-loader" } ],
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};