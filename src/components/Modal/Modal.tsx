import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Modal.module.scss";
import { Button, View, Image } from "@aws-amplify/ui-react";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <Dialog.Close asChild>
          <Button
            className={styles.closeButton}
            aria-label="Close"
            style={{ border: "none" }}
          >
            <Image
              textAlign="center"
              src="/assets/icons/icon_close.svg"
              alt="Close Icon"
              loading="lazy"
              style={{ width: "1rem" }}
            />
          </Button>
        </Dialog.Close>
        <View className={styles.body}>{children}</View>
      </Dialog.Content>
    </Dialog.Root>
  );
}
