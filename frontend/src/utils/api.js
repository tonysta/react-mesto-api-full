class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getAuthHeaders() {
        const token = localStorage.getItem('token');
        let currentHeaders = this._headers;
        if (token) {
            currentHeaders.Authorization = `Bearer ${token}`;
        }
        return currentHeaders;
    }

    getProfileInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        }).then((res) => {
            return this.handleError(res);
        })
    }
    getCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return this.handleError(res);
        })
    }
    patchProfile(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then((res) => {
            return this.handleError(res);
        })
    }
    addCard(data) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then((res) => {
            return this.handleError(res);
        })
    }
    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            return this.handleError(res);
        })
    }
    editAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then((res) => {
            return this.handleError(res);
        })
    }
    addLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then((res) => {
            return this.handleError(res);
        })
    }
    removeLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            return this.handleError(res);
        })
    }
    changeLikeCardStatus(cardId, isLike) {
        if (isLike) {
            return this.removeLike(cardId);
        } else {
            return this.addLike(cardId);
        }
    }
    handleError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }
}

export const api = new Api({
    url: 'https://api.mesto15.nomoredomains.sbs/',
    // url: 'http://localhost:3000/',
    headers: {
        'content-type': 'application/json',
    }
});