import { Config } from "@serverless-stack/resources";

export default {
  config(_input: any) {
    return {
      name: "project-management-app",
      region: "us-east-1",
    };
  },
};
