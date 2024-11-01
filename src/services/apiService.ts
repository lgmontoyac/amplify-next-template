import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export const getVehicles = async () => {
  const response = await  client.graphql.call(client, {
    query: `query ListVehicles {
      listVehicles {
        items {
          id
          name
          segment
          fuelType
          datasheetURL
          engine
          gears
          doors
          passengers
          warranty
          priority
          logoImageURL
          previewImageURL
          galleryPictures {
            items {
              id
              imagePath
              coverText
            }
          }
          models {
            items {
              id
              name
              price
              shortName
              hasAntilockBrakeSystem
              hasElectronicStabilityControl
              hasFrontCollisionAlert
              hasChildRestraintSystem
              priority
              airbagsAmount
              colors {
                items {
                  id
                  name
                  iconPath
                  imagePath
                  priority
                }
              }
            }
          }
        }
      }
    }`,
  });

  if ("data" in response) {
    return response.data?.listVehicles?.items || [];
  }

  return [];
};

export const getVehiclesIds = async () => {
  const response = await  client.graphql.call(client, {
    query: `query ListVehicles {
      listVehicles {
        items {
          id
        }
      }
    }`,
  });

  if ("data" in response) {
    return response.data?.listVehicles?.items.map((item: any) => item.id) || [];
  }

  return [];
};
