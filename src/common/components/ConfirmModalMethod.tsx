import {
  CheckCircleTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Modal } from 'antd'

import { ModalFuncProps } from 'antd/lib/modal'
import React from 'react'

export const CustomModalConfirmation = (props: ModalFuncProps): void => {
  Modal.confirm({
    visible: false,
    title: 'Confirmar',
    content: 'content: Alguna descripción',
    ...props,
  })
}
export const CustomModalError = (props: ModalFuncProps): void => {
  Modal.error({
    title: 'Confirmar',
    content: 'content: Alguna descripción',
    ...props,
  })
}
export const CustomModalInfo = (props: ModalFuncProps): void => {
  Modal.info({
    title: 'Confirmar',
    content: 'content: Alguna descripción',
    ...props,
  })
}
export const Success = (props: ModalFuncProps): void => {
  Modal.success({
    title: 'Confirmar',
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    content: 'content: Alguna descripción',
    ...props,
  })
}
export const CustomModalWarning = (props: ModalFuncProps): void => {
  Modal.warning({
    title: 'Confirmar',
    icon: <ExclamationCircleOutlined />,
    content: 'content: Alguna descripción',
    ...props,
  })
}
