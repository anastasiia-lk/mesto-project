// get user

const configGetUser = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5/users/me',
  headers: {
    authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be'
  }
}

export const getUser = () => {
  return fetch(configGetUser.baseUrl, configGetUser)
}

// update user

const configUpdateUser = (name, job) => {
  return {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5/users/me',
    method: 'PATCH',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: job
    })
  }
}

export const updateUser = (name, job) => {
  return fetch(configUpdateUser(name, job).baseUrl, configUpdateUser(name, job))
}

// update avatar

const configUpdateAvatar = (link) => {
  return {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5/users/me/avatar',
    method: 'PATCH',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${link}`,
    })
  }
}

export const updateAvatar = (link) => {
  return fetch(configUpdateAvatar(link).baseUrl, configUpdateUser(link))
}

// get cards

const configGetCards = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5/cards',
  headers: {
    authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be'
  }
}

export const getCards = () => {
  return fetch(configGetCards.baseUrl, configGetCards)
}

// post cards

const configPostCard = (name, link) => {
  return {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5/cards',
    method: 'POST',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
    name: name,
    link: link
    })
  }
}

export const postCard = (name, link) => {
  return fetch(configPostCard(name, link).baseUrl, configPostCard(name, link))
}

//delete card

const configDeleteCard = (id) => {
  return {
    baseUrl: `https://nomoreparties.co/v1/plus-cohort-5/cards/${id}`,
    method: 'DELETE',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
    },
  }
}

export const deleteCard = (id) => {
  return fetch(configDeleteCard(id).baseUrl, configDeleteCard(id))
}

//add like

const configAddLike = (id) => {
  return {
    baseUrl: `https://nomoreparties.co/v1/plus-cohort-5/cards/likes/${id}`,
    method: 'PUT',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
    },
  }
}

export const addLike = (id) => {
  return fetch(configAddLike(id).baseUrl, configAddLike(id))
}

//delete like

const configDeleteLike = (id) => {
  return {
    baseUrl: `https://nomoreparties.co/v1/plus-cohort-5/cards/likes/${id}`,
    method: 'DELETE',
    headers: {
      authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
    },
  }
}

export const deleteLike = (id) => {
  return fetch(configDeleteLike(id).baseUrl, configDeleteLike(id))
}



