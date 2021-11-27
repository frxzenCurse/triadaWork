import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import React from "react";
import cl from '../styles/TaskModal.module.scss'
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';

interface TaskModalProps {
  showModal: boolean;
  closeModal: () => void;
  // setTask: () => void;
}

interface FormValues {
  title: string;
  tasks: { text: string }[];
}

export const TaskModal: React.FC<TaskModalProps> = ({ showModal, closeModal }) => {

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>({
    defaultValues: {
      tasks: [{ text: '' }],
      title: '',
    }
  })
  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });

  const RefInput = React.forwardRef((props, ref) => (
    <Input
      type="text"
      color="lightBlue"
      size="regular"
      outline={true}
      placeholder="Заголовок"
      inputRef={ref}
      {...props}
    />
  ));
  const ref = React.createRef();

  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <Modal size="regular" active={showModal} toggler={closeModal}>
      <ModalHeader toggler={closeModal}>
        Modal Title
      </ModalHeader>
      <ModalBody>
        <form action="/" className={cl.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={
              ({ field }) => <RefInput {...field} ref={ref} />
            }
          />
          <div className={cl.text}>Список задач</div>
          <ul className={cl.list}>
            {fields.map((field, index) =>
              <li className={cl.item} key={field.id}>
                <div className={cl.index}>{index + 1}.</div>
                <Controller
                  name={`tasks.${index}.text`}
                  control={control}
                  render={
                    ({ field }) =>
                      <Input
                        type="text"
                        color="lightBlue"
                        size="sm"
                        outline={false}
                        placeholder="Задача"
                        {...field}
                      />
                  }
                />
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
              Добавить задачу
            </Button>
          </div>
          <button>submit</button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="red"
          buttonType="link"
          onClick={closeModal}
          ripple="dark"
        >
          Close
        </Button>
        <Button
          color="green"
          onClick={() => console.log(123)}
          ripple="light"
        >
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}