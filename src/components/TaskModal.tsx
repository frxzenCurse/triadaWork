import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import React, { useEffect } from "react";
import cl from '../styles/TaskModal.module.scss'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import MyInput from "./common/MyInput";

interface TaskModalProps {
  showModal: boolean;
  closeModal: () => void;
  setTask: (task: FormValues) => void;
}

export interface FormValues {
  title: string;
  tasks: { text: string }[];
}

export const TaskModal: React.FC<TaskModalProps> = ({ showModal, closeModal, setTask }) => {

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>({
    defaultValues: {
      tasks: [{ text: '' }],
    }
  })
  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit: SubmitHandler<FormValues> = data => setTask(data)

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      closeModal()
    }
  }, [isSubmitSuccessful])

  return (
    <Modal size="regular" active={showModal} toggler={closeModal}>
      <form action="/" className={cl.form} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggler={closeModal}>
          Modal Title
        </ModalHeader>
        <ModalBody>
          <MyInput type='text' placeholder="Заголовок задачи" {...register('title', { required: true })} />
          {errors.title && <div className="error-message">Поле обязательно для заполнения</div>}
          <div className={cl.text}>Список задач</div>
          <ul className={cl.list}>
            {fields.map((field, index) =>
              <li className={cl.item} key={field.id}>
                <div className={cl.row}>
                  <div className={cl.index}>{index + 1}.</div>
                  <MyInput type='text' {...register(`tasks.${index}.text`, { required: true })} />
                </div>
                {errors.tasks ? <div className="error-message">Поле обязательно для заполнения</div> : null}
              </li>
            )}
          </ul>
          <div className={cl.button}>
            <Button
              color="lightBlue"
              buttonType="outline"
              size="sm"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="dark"
              onClick={() => append([{ text: '' }])}
              type="button"
            >
              Добавить подзадачу
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={closeModal}
            ripple="dark"
            type='button'
          >
            Закрыть
          </Button>
          <Button
            color="green"
            ripple="light"
          >
            Добавить задачу
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}