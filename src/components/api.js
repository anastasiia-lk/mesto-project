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
        return this._checkResponse(res);
      })
  }

  // delete card

  deleteCard (id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => {
        return this._checkResponse(res);
      })
  }

  // update avatar

  updateAvatar (link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(res => {
        return this._checkResponse(res);
      })
  }

  // update user

  updateUser (name, job) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(res => {
        return this._checkResponse(res);
      })
  }

  // post cards

  postCard (name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
      name: name,
      link: link
      })  
    })
      .then(res => {
        return this._checkResponse(res);
      })
  }
}
