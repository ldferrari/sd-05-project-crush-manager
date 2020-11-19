const createProfile = ({ id, name, age, date: { datedAt, rate } }) => {
  console.log(id);
  return {
    age,
    date: {
      datedAt,
      rate,
    },
    id,
    name,
  };
};

module.exports = {
  createProfile,
};
