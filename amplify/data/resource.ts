import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sendToKumo } from "../functions/send-to-kumo/resource";

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
      name: a.string().required(),
      segment: a.string().required(),
      fuelType: a.string().required(),
      datasheetURL: a.string(),
      previewImageURL: a.string(),
      logoImageURL: a.string(),
      engine: a.string(),
      gears: a.string(),
      doors: a.integer(),
      passengers: a.integer(),
      warranty: a.string(),
      priority: a.integer(),
      models: a.hasMany("VehicleModel", "vehicleId"),
      galleryPictures: a.hasMany("VehicleGalleryPicture", "vehicleId"),
    })
    .secondaryIndexes((index) => [index("name")])
    .identifier(["id"])
    .authorization(allow => [allow.publicApiKey()])
  ,
  VehicleModel: a
    .model({
      id: a.id().required(),
      vehicleId: a.id().required(),
      vehicle: a.belongsTo("Vehicle", "vehicleId"),
      name: a.string().required(),
      price: a.integer(),
      shortName: a.string(),
      hasAntilockBrakeSystem: a.boolean(),
      hasElectronicStabilityControl: a.boolean(),
      hasFrontCollisionAlert: a.boolean(),
      hasChildRestraintSystem: a.boolean(),
      airbagsAmount: a.integer(),
      priority: a.integer(),
      colors: a.hasMany("VehicleColor", "modelId"),
    })
    .secondaryIndexes((index) => [index("name")])
    .identifier(["id"])
    .authorization(allow => [allow.publicApiKey()])
  ,
  VehicleColor: a
    .model({
      id: a.id().required(),
      modelId: a.id().required(),
      model: a.belongsTo("VehicleModel", "modelId"),
      name: a.string().required(),
      iconPath: a.string(),
      imagePath: a.string(),
      priority: a.integer(),
    })
    .identifier(["id"])
    .authorization((allow) => [allow.publicApiKey()])
  ,
  VehicleGalleryPicture: a
    .model({
      id: a.id().required(),
      vehicleId: a.id().required(),
      vehicle: a.belongsTo("Vehicle", "vehicleId"),
      imagePath: a.string(),
      coverText: a.string(),
      priority: a.integer(),
      showInViewer: a.boolean(),
    })
    .identifier(["id"])
    .authorization((allow) => [allow.publicApiKey()])
  ,
  sendToKumo: a
    .query()
    .arguments({
      lastName: a.string(),
      firstName: a.string(),
      identificationNumber: a.string(),
      identificationType: a.string(),
      email: a.email(),
      phoneNumber: a.phone(),
      vehicleModel: a.string(),
      vehicleVersion: a.string(),
      city: a.string(),
      dealer: a.string(),
      dealerCode: a.string(),
      dataAuthorization: a.boolean(),
      termsAndConditions: a.boolean(),
    })
    .returns(a.customType({
      success: a.boolean(),
      message: a.string()
    }))
    .handler(a.handler.function(sendToKumo))
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