import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  layers: ["${ssm:/group01/${self:provider.stage}/layer}"],
  events: [
    {
      http: {
        method: "get",
        path: "medics",
      },
    },
  ],
};
