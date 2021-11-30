import React from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'

const CustomModal: React.FunctionComponent<ModalProps> = ({
  bodyStyle = {},
  cancelText = 'Cancelar',
  centered = false,
  closable = true,
  confirmLoading = false,
  destroyOnClose = true,
  forceRender = false,
  mask = true,
  maskClosable = true,
  maskStyle = {},
  okText = 'Aceptar',
  okType = 'primary',
  visible = false,
  width = 520,
  zIndex = 1000,
  ...props
}): React.ReactElement => (
  <Modal
    bodyStyle={bodyStyle}
    cancelText={cancelText}
    centered={centered}
    closable={closable}
    confirmLoading={confirmLoading}
    destroyOnClose={destroyOnClose}
    forceRender={forceRender}
    mask={mask}
    maskClosable={maskClosable}
    maskStyle={maskStyle}
    okText={okText}
    okType={okType}
    visible={visible}
    width={width}
    zIndex={zIndex}
    {...props}
  >
    {props.children}
  </Modal>
)

export default CustomModal
