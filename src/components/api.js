
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
    headers: {
        authorization: '5da21f1f-49c7-4f13-a704-f247cde7ca37',
        'Content-Type': 'application/json'
    }
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function request(url, options) {
    return fetch(url, options)
        .then(handleResponse);
}

export function getProfileInfo() {
    return request(`${config.baseUrl}/users/me`, {
        headers: config.headers})
} 

export function getInitialCards() {
    return request(`${config.baseUrl}/cards`, {
        headers: config.headers})
} 

export function updateProfileInfo(profile) {
    return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profile.name,
            about: profile.about
        }),
    })
}

export function addCard(card) {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
        }),
    })
}

export function deleteMyCard(cardId) {
    return request(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers})
}

export function addLike(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers})
}

export function deleteLike(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers})
}

export function newAvatar(link) {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    })
}