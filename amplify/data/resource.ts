import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Vehicle: a
    .model({
      id: a.id().required(),
      segment: a.enum([
        'Automóvil',
        'Camioneta',
        'Pickup',
        'TGR'
      ]),
      name: a.string().required(),
      fuelType: a.string().required(),
      models: a.hasMany("VehicleModel", "vehicleId"),
    })
    .secondaryIndexes((index) => [index("name")])
    .identifier(["id"])
    .authorization(allow => [allow.publicApiKey()])
  ,
  VehicleModel: a
    .model({
      id: a.id().required(),
      vehicleId: a.id(),
      vehicle: a.belongsTo("Vehicle", "vehicleId"),
      name: a.string().required(),
      fuelType: a.string().required(),
      engine: a.string().required(),
      gears: a.string().required(),
      doors: a.integer().required(),
      passengers: a.integer().required(),
      warranty: a.string().required(),
      datasheetURL: a.string().required(),
      colors: a.hasMany("VehicleColor", "modelId"),
    })
    .secondaryIndexes((index) => [index("name")])
    .identifier(["id"])
    .authorization(allow => [allow.publicApiKey()])
  ,
  VehicleColor: a
    .model({
      id: a.id().required(),
      modelId: a.id(),
      model: a.belongsTo("VehicleModel", "modelId"),
      name: a.string().required(),
      iconPath: a.string().required(),
      imagePath: a.string().required(),
    })
    .identifier(["id"])
    .authorization((allow) => [allow.publicApiKey()])
  ,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
