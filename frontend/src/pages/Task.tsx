import { Button, Modal, TextInput, List } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
const Task = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <TextInput label="Task" placeholder="Running on track" required />
      </Modal>
      <div>
        Task <Button onClick={open}>Add Task</Button>
        <List>
          <List.Item>Clone or download repository from GitHub</List.Item>
          <List.Item>Install dependencies with yarn</List.Item>
          <List.Item>
            To start development server run npm start command
          </List.Item>
          <List.Item>
            Run tests to make sure your changes do not break the build
          </List.Item>
          <List.Item>Submit a pull request once you are done</List.Item>
        </List>
      </div>
    </>
  );
};

export default Task;
