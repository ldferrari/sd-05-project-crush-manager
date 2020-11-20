// const logged = require('./login')

const nameIsValid = (name) => {
  if (!name) {
    return {
      message: 'O campo "name" é obrigatório',
    };
  }
  if (name.length < 3) {
    return {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }
};

const ageIsValid = (age) => {
  if(!age) {
    return {
      "message": "O campo \"age\" é obrigatório"
    }
  };
  if(age < 18) {
    return {
      "message": "O crush deve ser maior de idade"
    }
  };
}

const dateIsValid = (date) => {
  var data = new Date();
  var day = data.getDate;
  var month = data.getMonth;
  var year = data.getFullYear;

  var str_data = `${day}/${month + 1}/${year}`;
  console.log(str_data);

  const datedAt = str_data(date)

  if(!datedAt) {
    return {
      "message": "O campo \"datedAt\" deve ter o formato \"dd/mm/aaaa\""
    }
  }
  return;
}

// const nameWorks = nameIsValid(name);
// if (nameWorks.message) {
//   return res.status(400).json(nameWorks)
// }

module.exports = {
  nameIsValid,
  ageIsValid,
  dateIsValid,
};
