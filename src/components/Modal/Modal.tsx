import * as Dialog from "@radix-ui/react-dialog";
import styles from "./Modal.module.scss";
import { Button, View, Image } from "@aws-amplify/ui-react";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <Dialog.Description className={styles.description}>{description}</Dialog.Description>
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
