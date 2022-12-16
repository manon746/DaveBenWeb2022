const apiBaseURL = "http://localhost:5000";
const images = "/api/images";
//#region Images
function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + images,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + images + "/" + id,
        type: 'GET',
        headers: getBearerAutorizationToken(),
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ALL(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + images + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        headers: getBearerAutorizationToken(),
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function POST(data, successCallBack, errorCallBack) {
    console.log(data.UserId);
    $.ajax({
        url: apiBaseURL + images,
        type: 'POST',
        headers: getBearerAutorizationToken(),
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function PUT(bookmark, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + images + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        headers: getBearerAutorizationToken(),
        data: JSON.stringify(bookmark),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function DELETE(id, successCallBack, errorCallBack) {
    console.log("DeleteImage");
    $.ajax({
        url: apiBaseURL + images + "/" + id,
        headers: getBearerAutorizationToken(),
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
//#endregion

//#region Accounts

function storeLoggedUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}
function retrieveLoggedUser() {
    return JSON.parse(sessionStorage.getItem('user'));
}


function storeAccessToken(token) {
    sessionStorage.setItem('access_Token', token);
}
function eraseAccessToken() {
    sessionStorage.removeItem('access_Token');
}
function retrieveAccessToken() {
    return sessionStorage.getItem('access_Token');
}

function getBearerAutorizationToken() {
    console.log(retrieveAccessToken());
    return { 'Authorization': 'Bearer ' + retrieveAccessToken() };
}

function storeUserInfo(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
}
function getUser() {
    return JSON.parse(sessionStorage.getItem('user'));

}


function deconnect() {
    console.log("deco")
    sessionStorage.removeItem('user');
    eraseAccessToken();
}

//Done
function register(profil, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/Accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profil),
        success: function (profil) {
            successCallBack(profil)
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
// done
function login(credentials, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(credentials),
        success: function (profil) {
            storeAccessToken(profil.Access_token)
            getUserInfo(profil.UserId, successCallBack, errorCallBack);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function verify(code, userId, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + `/Accounts/verify?id=${userId}&code=${code}`,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: function () {
            getUserInfo(userId, successCallBack, error);
            successCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


function getUserInfo(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + `/Accounts/index/${userId}`,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: function (profil) {
            storeLoggedUser(profil);
            successCallBack()
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function modifyUserInfo(userInfo, successCallBack, errorCallBack) {
    $.ajax({

        url: apiBaseURL + "/Accounts/modify/" + userInfo.Id,
        type: 'PUT',
        contentType: 'application/json',
        headers: getBearerAutorizationToken(),
        data: JSON.stringify(userInfo),
        success: function () {
            getUserInfo(userInfo.Id, successCallBack, error)
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }

    });
}

// Done
function logout(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/Accounts/logout/" + userId,
        type: 'GET',
        data: {},
        headers: getBearerAutorizationToken(),
        success: () => {
            deconnect();
            successCallBack()
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });

}
//#endregion

function DeleteUser(userId, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/Accounts/remove/" + userId,
        contentType: 'application/json',
        type: 'GET',
        data: {},
        headers: getBearerAutorizationToken(),
        success: () => {
            deconnect();
            successCallBack();

        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }

    });
}


