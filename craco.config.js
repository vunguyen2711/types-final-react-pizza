const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#df2020",
              "border-radius-base": "20px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
