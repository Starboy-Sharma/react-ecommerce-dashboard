import { Container, Box, TextInput, Button } from '@mantine/core';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

import './LoginPage.css';

export default function LoginPage() {
  return (
    <Container h={'100vh'} className="login-container">
      <Box w={400} p={'1rem'} className="login-wrapper">
        <form>
          <Box>
            <h1> Howdy Admin! </h1>
          </Box>
          <Box className="login-form">
            <TextInput
              placeholder="Your email"
              type="email"
              label="Email:"
              leftSection={<MdAlternateEmail size={16} />}
              required
            />
            <TextInput
              placeholder="Password"
              type="password"
              label="Password:"
              leftSection={<FaLock size={16} />}
              required
            />
            <Button type="submit" fullWidth mt={'md'} variant="gradient">
              {' '}
              Login{' '}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
