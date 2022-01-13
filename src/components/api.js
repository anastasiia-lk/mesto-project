const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
  }
}
// get user

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

// update user

const configUpdateUser = (name, job) => {
  return {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: job
    })
  }
}

export const updateUser = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, configUpdateUser(name, job))
}

// update avatar

const configUpdateAvatar = (link) => {
  return {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${link}`,
    })
  }
}

export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, configUpdateAvatar(link))
}

// get cards

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

// post cards

const configPostCard = (name, link) => {
  return {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
    name: name,
    link: link
    })
  }
}

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, configPostCard(name, link))
}

//delete card

const configDeleteCard = {
    method: 'DELETE',
    headers: config.headers,
}

export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, configDeleteCard)
}

//add like

const configAddLike = {
    method: 'PUT',
    headers: config.headers,
}

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, configAddLike)
}

//delete like

const configDeleteLike = {
    method: 'DELETE',
    headers: config.headers,
}

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, configDeleteLike)
}



