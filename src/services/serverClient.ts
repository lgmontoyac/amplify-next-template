"use server"; 

import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import amplifyConfig from '../../amplify_outputs.json';

const createClient = (cookies: any) => {
  // Asegúrate de que esto se llame dentro de un contexto de servidor
  return generateServerClientUsingCookies({
    config: amplifyConfig,
    cookies // Pasa la función cookies en lugar de llamarla
  });
};

export const getVehicleIds = async (cookies: any) => {
  const cookieBasedClient = createClient(cookies); // Esto ahora es una función sincrónica
  const response = await cookieBasedClient.graphql({
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
