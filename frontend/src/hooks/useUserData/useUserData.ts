import { useEffect, useState } from 'react';

import { UserType } from '@/models/users';
import tank from '@/utils/axios';

const useUserData = () => {
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const results = await tank.get('/users/myself');

        if (results?.data?.details) {
          setUserData(results.data.details);
        } else {
          console.error('No user data found in the response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return userData;
};

export default useUserData;
