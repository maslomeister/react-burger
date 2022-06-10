import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {},
    specPattern: "src/**/*.spec.{js,ts,jsx,tsx}",
  },

  e2e: {
    baseUrl: "http://localhost:3000/react-burger",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
