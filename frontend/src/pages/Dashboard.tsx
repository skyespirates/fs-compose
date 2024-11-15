import { Flex, Box, Divider, Text, Title } from '@mantine/core';
const Dashboard = () => {
  return (
    <div>
      <Flex mih={180} columnGap={'md'}>
        <Box
          miw={180}
          style={{
            borderRadius: '15px',
          }}
          bg={'gray'}
        >
          <Text size="xl">Todo</Text>
          <Divider />
          <Title>3</Title>
        </Box>
        <Box
          miw={180}
          style={{
            borderRadius: '15px',
          }}
          bg={'blue'}
        >
          <Text size="xl">In Progress</Text>
          <Divider />
          <Title>4</Title>
        </Box>
        <Box
          miw={180}
          style={{
            borderRadius: '15px',
          }}
          bg={'green'}
        >
          <Text size="xl">Done</Text>
          <Divider />
          <Title>5</Title>
        </Box>
      </Flex>
    </div>
  );
};

export default Dashboard;
