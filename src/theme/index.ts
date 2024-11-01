import { text } from '@/theme/text';
import { button } from '@/theme/button';
import { colors } from '@/theme/colors';
import { Theme } from '@aws-amplify/ui-react';
import { fontsDefault } from '@/theme/fontsDefault';
import { fontSize } from '@/theme/fontSize';

export const ToyotaTotemTheme: Theme =  {
  name: 'toyota-totem-theme',
  tokens: {
    colors: colors,
    fonts: fontsDefault,
    fontSizes: fontSize,
    components: {
      text: text,
      button: button,
    }
  }
};

export default ToyotaTotemTheme;