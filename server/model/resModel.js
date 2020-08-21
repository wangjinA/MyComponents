class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.data = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.data = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.status = 1
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.status = 0
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}