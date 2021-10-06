
// TODO: make sure this is truly unique for every user!
// Every user has a unique 6 digits token that we use to invite people
const generate = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// console.log(generate(6));

module.exports = {
  generate,
};
