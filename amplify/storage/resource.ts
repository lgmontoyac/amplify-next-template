import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "toyota-totem-files",
  access: (allow) => ({
    "images/*": [allow.authenticated.to(["read", "write", "delete"])],
  }),
});