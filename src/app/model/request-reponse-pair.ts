export class RequestReponsePair {

    requestLocation;
    requestMethod;
    requestBody;
    responseStatus;
    responseBody;

    constructor(requestLocation, requestMethod, requestBody, responseStatus, responseBody) {
        this.requestLocation = requestLocation;
        this.requestMethod = requestMethod;
        this.requestBody = requestBody;
        this.responseStatus = responseStatus;
        this.responseBody = responseBody;
    }
}
