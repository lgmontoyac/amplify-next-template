import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Modal.module.scss";
import { Button, View, Image } from "@aws-amplify/ui-react";
import { MutableRefObject } from "react";
import Keyboard from "../Keyboard/Keyboard";
import { SimpleKeyboard as SimpleKeyboardType } from "react-simple-keyboard";
interface KeyboardProps {
  focusedInput: string;
  keyboard: MutableRefObject<null>;
  handleInputChange: (value: string) => void;
  inputPattern: any;
}

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  keyboardProps: KeyboardProps;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  keyboardProps,
}: ModalProps) {
  const { focusedInput, keyboard, handleInputChange, inputPattern } =
    keyboardProps;
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Keyboard
          inputName={focusedInput}
          keyboardRef={keyboard}
          onChange={handleInputChange} // Actualiza el input activo
          inputPattern={inputPattern}
        />
        <View position={focusedInput !== "" ? "relative" : ""}>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          <Dialog.Description className={styles.description}>
            {description}
          </Dialog.Description>
          <Button
            className={styles.closeButton}
            aria-label="Close"
            onClick={onClose}
            style={{ border: "none" }}
          >
            <Image
              textAlign="center"
              src="/assets/icons/icon_close.svg"
              alt="Close Icon"
              loading="lazy"
              className={styles.closeButton}
            />
          </Button>

          <View className={styles.body}>{children}</View>
        </View>
      </Dialog.Content>
    </Dialog.Root>
  );
}
