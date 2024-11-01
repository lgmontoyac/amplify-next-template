import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';
import amplifyConfig from '../../amplify_outputs.json';

export const cookieBasedClient = generateServerClientUsingCookies({
  config: amplifyConfig,
  cookies
});