// check response

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
} 

export default class Api {
  constructor ({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status)
  }

  // get user

  getUser () {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        return this._checkResponse(res);
      }) 
  }

  // get cards

  getCards () {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        return this._checkResponse(res);
      })
  }

  // add like

  addLike (id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers 
    })
      .then(res => {
        return this._checkResponse(res);
      })
  }

  // delete like

  deleteLike (id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => {
        return checkResponse(res);
      })
  }

  // delete card

  deleteCard (id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => {
        return checkResponse(res);
      })
  }
}

// export const api = new Api ({
//   baseUrl: config.baseUrl,
//   headers: config.headers
// })

// get user

// export const getUser = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers
//   })
//     .then(res => {
//       return checkResponse(res);
//     })
// }

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

// export const getCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(res => {
//       return checkResponse(res);
//     })
// }

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

// const configDeleteCard = {
//     method: 'DELETE',
//     headers: config.headers,
// }

// export const deleteCard = (id) => {
//   return fetch(`${config.baseUrl}/cards/${id}`, configDeleteCard)
//     .then(res => {
//       return checkResponse(res);
//     })
// }

//add like

// const configAddLike = {
//     method: 'PUT',
//     headers: config.headers,
// }

// export const addLike = (id) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, configAddLike)
//     .then(res => {
//       return checkResponse(res);
//     })
// }

//delete like

// const configDeleteLike = {
//     method: 'DELETE',
//     headers: config.headers,
// }

// export const deleteLike = (id) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, configDeleteLike)
//     .then(res => {
//       return checkResponse(res);
//     })
// }



