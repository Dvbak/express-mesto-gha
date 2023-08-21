const urlRegAvatar = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const regPassword = /^[a-zA-Z0-9]{8,}$/;

module.exports = {
  urlRegAvatar,
  regPassword,
};
