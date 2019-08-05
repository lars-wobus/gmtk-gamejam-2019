import userComments from '../data/user-comments';

const userCommentsCount = userComments.length;

export const getRandomUserComment = () => {
    return userComments[Math.floor(Math.random() * userCommentsCount)];
};