import userNames from '../data/user-names';

const userNameCount = userNames.length;

export const getRandomUserName = () => {
    return userNames[Math.floor(Math.random() * userNameCount)];
};