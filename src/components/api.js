const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: '31d8c365-d1c0-426e-b228-1cdaf2cce2be',
  }
}

// check response

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
} 

// get user

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      return checkResponse(res);
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
    .then(res => {
      return checkResponse(res);
    })
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
    .then(res => {
      return checkResponse(res);
    })
}

// get cards

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      return checkResponse(res);
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
    .then(res => {
      return checkResponse(res);
    })
}

//delete card

const configDeleteCard = {
    method: 'DELETE',
    headers: config.headers,
}

export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, configDeleteCard)
    .then(res => {
      return checkResponse(res);
    })
}

//add like

const configAddLike = {
    method: 'PUT',
    headers: config.headers,
}

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, configAddLike)
    .then(res => {
      return checkResponse(res);
    })
}

//delete like

const configDeleteLike = {
    method: 'DELETE',
    headers: config.headers,
}

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, configDeleteLike)
    .then(res => {
      return checkResponse(res);
    })
}



