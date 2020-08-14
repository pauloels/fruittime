import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  ImageLogo,
  LogOutIcon,
  ViewImage,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
} from './styles';

const Home: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  console.log(user);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <ViewImage>
          <LogOutIcon onPress={signOut} name="power" size={30} color="#fff" />

          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />
            <HeaderTitle>
              Bem vindo,
              {'\n'}
              <UserName>{user.name}</UserName>
            </HeaderTitle>
          </ProfileButton>
        </ViewImage>
      </Header>
      <ImageLogo source={logo} />
    </Container>
  );
};

export default Home;
