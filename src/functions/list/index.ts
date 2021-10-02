import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  name: "${self:custom.channel.name}-${self:provider.stage}-${self:custom.lambda.type}-list-medics",
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
